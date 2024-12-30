import { Dialog } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  open: any
  handleClose: any
}

const VideoPopup: FC<Props> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/XpqqjU7u5Yc"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      />
    </Dialog>
  )
}

export default VideoPopup
