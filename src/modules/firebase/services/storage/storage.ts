import {
  deleteObject,
  getDownloadURL,
  listAll,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';

// TODO: make this a hook
export const getFilesByReference = async (reference: StorageReference) => {
  const response = await listAll(reference);
  return response;
};

export const deleteFileByReference = async (reference: StorageReference) => {
  const response = await deleteObject(reference);
  return response;
};

export const uploadFile = async (reference: StorageReference, file: File) => {
  const response = await uploadBytes(reference, file);
  return response;
};

export const getFileUrl = async (reference: StorageReference) => {
  const url = await getDownloadURL(reference);
  return url;
};

export const getCDNUrl = (
  storageUrl: string,
  width: number,
  height: number,
  customClass?: string
) => {
  if (storageUrl.includes('picsum')) {
    return storageUrl;
  }

  return (
    'https://greenly.b-cdn.net' +
    storageUrl.split('appspot.com')[1] +
    `?w=${width}&h=${height}${
      customClass ? `&class=${customClass}` : ''
    }&optimizer=image`
  );
};

export const imageExists = (url: string) => {
  const image = new Image();

  image.src = url;

  if (!image.complete) {
    return false;
  }

  return true;
};
