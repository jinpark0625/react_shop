export async function uploadImage(file: File | undefined) {
  const fileData = file ?? new Blob();
  const cloudPreset = process.env.REACT_APP_CLOUDINARY_PRESET ?? new Blob();
  const cloudUrl = process.env.REACT_APP_CLOUDINARY_URL ?? new URL('');

  const data = new FormData();
  data.append('file', fileData);
  data.append('upload_preset', cloudPreset);

  return await fetch(cloudUrl, {
    method: 'POST',
    body: data,
  })
    .then(async (res) => await res.json())
    .then((data) => data.url);
}
