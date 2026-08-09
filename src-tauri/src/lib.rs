use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use std::process::Command;

#[derive(Serialize, Deserialize)]
pub struct FileEntry {
    name: String,
    path: String,
    is_dir: bool,
    size: u64,
}

#[derive(Serialize, Deserialize)]
pub struct GitStatus {
    branch: String,
    changed: Vec<String>,
    staged: Vec<String>,
    untracked: Vec<String>,
}

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_file(path: String, content: String) -> Result<(), String> {
    fs::write(&path, content).map_err(|e| e.to_string())
}

#[tauri::command]
fn list_directory(path: String) -> Result<Vec<FileEntry>, String> {
    let entries = fs::read_dir(&path).map_err(|e| e.to_string())?;
    let mut result = Vec::new();
    for entry in entries.flatten() {
        let metadata = entry.metadata().ok();
        result.push(FileEntry {
            name: entry.file_name().to_string_lossy().to_string(),
            path: entry.path().to_string_lossy().to_string(),
            is_dir: entry.path().is_dir(),
            size: metadata.map(|m| m.len()).unwrap_or(0),
        });
    }
    result.sort_by(|a, b| match (a.is_dir, b.is_dir) {
        (true, false) => std::cmp::Ordering::Less,
        (false, true) => std::cmp::Ordering::Greater,
        _ => a.name.to_lowercase().cmp(&b.name.to_lowercase()),
    });
    Ok(result)
}

#[tauri::command]
fn create_file(path: String) -> Result<(), String> {
    fs::File::create(&path).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn create_directory(path: String) -> Result<(), String> {
    fs::create_dir_all(&path).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_path(path: String) -> Result<(), String> {
    let p = PathBuf::from(&path);
    if p.is_dir() { fs::remove_dir_all(&path) } else { fs::remove_file(&path) }.map_err(|e| e.to_string())
}

#[tauri::command]
fn rename_path(old_path: String, new_path: String) -> Result<(), String> {
    fs::rename(&old_path, &new_path).map_err(|e| e.to_string())
}

#[tauri::command]
fn run_command(command: String, cwd: Option<String>) -> Result<String, String> {
    let (shell, flag) = if cfg!(target_os = "windows") { ("cmd", "/C") } else { ("sh", "-c") };
    let mut cmd = Command::new(shell);
    cmd.arg(flag).arg(&command);
    if let Some(dir) = cwd { cmd.current_dir(dir); }
    let output = cmd.output().map_err(|e| e.to_string())?;
    let out = String::from_utf8_lossy(&output.stdout).to_string();
    if output.status.success() { Ok(out) } else { Err(format!("{}\n{}", out, String::from_utf8_lossy(&output.stderr))) }
}

#[tauri::command]
fn git_status(cwd: String) -> Result<GitStatus, String> {
    let output = Command::new("git").args(["status", "--porcelain", "-b"]).current_dir(&cwd).output().map_err(|e| e.to_string())?;
    let stdout = String::from_utf8_lossy(&output.stdout);
    let lines: Vec<&str> = stdout.lines().collect();
    let branch = lines.first().map(|l| l.trim_start_matches("## ").split("...").next().unwrap_or("main")).unwrap_or("main").to_string();
    let (mut changed, mut staged, mut untracked) = (Vec::new(), Vec::new(), Vec::new());
    for line in lines.iter().skip(1) {
        if line.len() < 3 { continue; }
        let (status, file) = (&line[0..2], line[3..].to_string());
        if status == "??" { untracked.push(file); }
        else { if !status.starts_with(' ') { staged.push(file.clone()); } if !status.ends_with(' ') { changed.push(file); } }
    }
    Ok(GitStatus { branch, changed, staged, untracked })
}

#[tauri::command]
fn git_commit(cwd: String, message: String) -> Result<String, String> {
    let output = Command::new("git").args(["commit", "-m", &message]).current_dir(&cwd).output().map_err(|e| e.to_string())?;
    Ok(String::from_utf8_lossy(&output.stdout).to_string())
}

#[tauri::command]
fn git_add(cwd: String, files: Vec<String>) -> Result<(), String> {
    Command::new("git").arg("add").args(&files).current_dir(&cwd).output().map_err(|e| e.to_string())?;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(tauri_plugin_log::Builder::default().level(log::LevelFilter::Info).build())?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![read_file, write_file, list_directory, create_file, create_directory, delete_path, rename_path, run_command, git_status, git_commit, git_add])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
