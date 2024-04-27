export type WorkspaceFile = {
  name: string;
  children?: WorkspaceFile[];
};

export async function selectFile(file: string): Promise<string> {
  const res = await fetch(`/api/select-file?file=${file}`);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.error);
  }
  return data.code as string;
}

export async function uploadFile(workspaceSubdir: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `/api/upload-file?workspace_subdir=${workspaceSubdir}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error || "Failed to upload file.");
  }
}

export async function getWorkspace(
  workspaceSubdir: string,
): Promise<WorkspaceFile> {
  const res = await fetch(
    `/api/refresh-files?workspace_subdir=${workspaceSubdir}`,
  );
  const data = await res.json();
  return data as WorkspaceFile;
}
