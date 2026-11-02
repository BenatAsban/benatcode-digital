import os
import zipfile
import shutil

EXCLUDE_DIRS = {
    'node_modules',
    'dist',
    'build',
    '.git',
    '.cache',
    'coverage',
    '__pycache__',
    '.idea',
    '.vscode',
    '.aistudio'
}

EXCLUDE_FILES = {
    '.DS_Store',
    'Thumbs.db',
    'benatcode-project.zip'
}

def create_project_zip(output_path, root_dir):
    parent = os.path.dirname(output_path)
    if parent and not os.path.exists(parent):
        os.makedirs(parent, exist_ok=True)

    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(root_dir):
            # Prune excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.zip'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, root_dir)
                zipf.write(full_path, rel_path)

if __name__ == '__main__':
    root_dir = os.path.abspath('.')
    
    # Target 1: Public web directory for 1-click download from browser
    public_target = os.path.join(root_dir, 'public', 'benatcode-project.zip')
    create_project_zip(public_target, root_dir)
    print(f"Created public zip at: {public_target} ({os.path.getsize(public_target)} bytes)")

    # Target 2: Artifact directory
    artifact_dir = '/.aistudio/artifacts/brain/dcb55fc9-b898-4514-9338-3b12697679a8'
    if os.path.exists(artifact_dir):
        artifact_target = os.path.join(artifact_dir, 'benatcode-project.zip')
        create_project_zip(artifact_target, root_dir)
        print(f"Created artifact zip at: {artifact_target} ({os.path.getsize(artifact_target)} bytes)")
