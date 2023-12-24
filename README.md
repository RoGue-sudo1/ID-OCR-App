Thai ID OCR Frontend🚀🚀


App Layout-{
    - Main Container{File uploader}
    - Secondary Container{Data}
}

Main Container (Chunked.js)
 - In this container we are having a file uploader input in which we will take or image as a input.
 - Now this image is stored in cloudinary.
 - After that the cloudinary image url is sent to backend.

Secondary Container (History.js)
 - This component will show all the data stored in our database with delete and update button
 