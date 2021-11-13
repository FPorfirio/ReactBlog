import { useState } from 'react'

export const UploadWidget = () => {
  const [result, setResult] = useState(null)

  const uploadModal = () => {
    return cloudinary.openUploadWidget(
      {
        cloudName: 'dxpdibonp',
        uploadPreset: 'pj76qphd',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info)
          setResult(result.info)
        }
        if (result.event === 'upload_added') {
        }
      }
    )
  }
  return {
    showUploadModal: uploadModal,
    imgUploadResult: result,
  }
}
