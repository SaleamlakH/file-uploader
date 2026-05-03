import Action from '../../components/Action/Action';
import { Download, TrashBin, Upload } from '../../components/Icons';
import style from './folder-view.module.css';
import ShareForm from '../../components/share-form/ShareForm';
import EditForm from '../../components/edit-form/EditForm';
import DeleteFolder from '../../components/folder-delete/FolderDelete';
import FolderActionMenu from '../../components/menu/FolderActionMenu';
import UploadFileForm from '../../components/upload-file-form/UploadFileForm';
import { useEffect, useState } from 'react';
import type { File, Folder } from '../../api/types/api';
import { deleteFile, downloadFile, getFolderFiles } from '../../api/folder';
import { useNavigate, useParams } from 'react-router';
import { ApiError } from '../../api/error';

export default function FolderView() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [folder, setFolder] = useState<(Folder & { files: File[] }) | undefined>();
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const formatSize = (size: number) => {
    if (typeof size !== 'number' || isNaN(size)) return '-';
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  };

  const setName = (value: string | ((prevState: string) => string)) => {
    if (typeof value === 'string') {
      return setFolder((prev) => prev && { ...prev, name: value });
    }

    setFolder((prev) => prev && { ...prev, name: value(folder?.name as string) });
  };

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const folder = await getFolderFiles(folderId as string);
        setFolder(folder);
      } catch (error) {
        if (error instanceof ApiError) {
          alert(error.message);
        }

        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchFolder();
  }, [folderId]);

  const handleDelete = async (folderId: string, fileId: string) => {
    await deleteFile(folderId, fileId);
    setFolder(
      (prev) =>
        prev && {
          ...prev,
          files: prev.files.filter(({ id }) => id !== fileId),
          _count: { files: --prev._count.files },
        },
    );
  };

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Loading Folder
        </div>
      ) : folder ? (
        <>
          <header className={style.header}>
            <div className={style.folderName}>
              <h1>{folder.name}</h1>
              <div>{folder._count.files} files</div>
            </div>

            <div className={style.actions}>
              {/* upload file */}
              <Action
                as="button"
                command="show-modal"
                commandFor="upload-file"
                onClick={() => console.log('dialog')}
                variant="primary"
              >
                <Upload />
                Upload
              </Action>

              <FolderActionMenu
                className={style.menu}
                dialogIds={{
                  edit: `edit-folder-${folder.id}`,
                  share: `share-folder-${folder.id}`,
                  delete: `delete-folder-${folder.id}`,
                }}
              />
            </div>
          </header>

          {/* File table */}
          {folder.files.length ? (
            <div className={style.wrapper}>
              <table className={style.table}>
                <thead>
                  <tr className={style.headRow}>
                    <th className={style.th}>Name</th>
                    <th className={style.th}>Size</th>
                    <th className={style.th}>Uploaded</th>
                    <th className={style.th}></th>
                  </tr>
                </thead>

                <tbody>
                  {folder.files.map((file, i) => (
                    <tr
                      key={file.id ?? file.filename ?? i}
                      className={`${style.row} ${hoveredIndex === i ? style.rowHover : ''}`}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <td className={style.tdName}>
                        <span className={style.nameText}>{file.filename}</span>
                      </td>

                      <td className={style.td}>{formatSize(file.size)}</td>

                      <td className={style.td}>{`${file.uploadedAt}`}</td>

                      <td className={style.actionsCell}>
                        <Action
                          as="button"
                          onClick={() => downloadFile(folder.id, file.id)}
                          className={style.downloadBtn}
                        >
                          <Download />
                        </Action>

                        <Action
                          as="button"
                          onClick={() => handleDelete(folder.id, file.id)}
                          className={style.downloadBtn}
                        >
                          <TrashBin />
                        </Action>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No file Uploaded</div>
          )}

          {/* upload files */}
          <UploadFileForm folderId={folder.id} setFolder={setFolder} />

          {/* share-folder form */}
          <ShareForm folderId={folder.id} />

          {/* Edit folder form */}
          <EditForm setName={setName} name={folder.name} folderId={folder.id} />

          {/* Delete folder */}
          <DeleteFolder onDelete={() => navigate('/')} folderId={folder.id} />
        </>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Folder Not Found
        </div>
      )}
    </>
  );
}
