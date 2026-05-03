import { useRef, useState, type DragEvent } from 'react';
import DialogForm from '../dialog-form/DialogForm';
import { Upload } from '../Icons';
import style from './upload-file-form.module.css';
import Action from '../Action/Action';
import type { File as FileInfo, Folder } from '../../api/types/api';
import { uploadFiles } from '../../api/folder';
import { ApiError } from '../../api/error';

type FolderWithFiles = (Folder & { files: FileInfo[] }) | undefined;
type UploadFileProps = {
  folderId: string;
  setFolder: (value: FolderWithFiles | ((prevState: FolderWithFiles) => FolderWithFiles)) => void;
};

export default function UploadFileForm({ folderId, setFolder }: UploadFileProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit: React.SubmitEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const folderFiles = await uploadFiles(folderId, files);

      dialogRef.current?.close();
      setFolder((prev) => prev && { ...prev, files: folderFiles as FileInfo[] });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 400) {
          return;
        }
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogForm ref={dialogRef} id="upload-file" header="Upload Files" onSubmit={handleSubmit}>
      <div
        className={`${style.dropZone} ${isDragging ? style.dropZoneActive : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={style.icon}>
          <Upload />
        </div>

        <p className={style.dropTitle}>Drag & drop files here</p>
        <span className={style.dropSub}>or click to browse</span>

        <Action as="button" type="button" variant="primary">
          Select Files
        </Action>

        <input
          ref={fileInputRef}
          id="files"
          type="file"
          name="files"
          multiple
          className={style.hiddenInput}
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className={style.fileList}>
          {files.map((file, i) => (
            <div key={i} className={style.fileItem}>
              <div>
                <div className={style.fileName}>{file.name}</div>
                <div className={style.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>

              <button className={style.removeBtn} onClick={() => removeFile(i)}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="buttons">
        <Action type="button" command="close" commandFor="upload-file" variant="secondary">
          Cancel
        </Action>
        <Action variant="primary" disabled={loading}>
          <Upload />
          {loading ? 'Uploading' : 'Upload'}
        </Action>
      </div>
    </DialogForm>
  );
}
