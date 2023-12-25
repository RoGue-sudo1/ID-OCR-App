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
 - This component will show all the data stored in our database with delete and update button.
 - In this we have fetched the data from localhost:5000 which has been stored by backend.
 - Now  we have rendered all the data fetched from the backed.
 - Now in this we have given to options-
   - First - to edit the card
   - Second- to delete the card (not from database or soft delete)
- When you click on edit button all fields changes to input field and data editted is storred in a state variable.
- when we click on the edit button at last of the card it contains two buttons-
  - Save button which will send the editted data to database.
  - Cancel button which will exit the edit mode.

- History Component:
  - At top left of the history page we have a select for filter it consists of all the field we can filter our card with.
  - Now when we choose an option from the field it gives a input that will filter according to the choosen field and two options:
                            - first is Search which will give us the filtered card
                            - second is cancel which will take us to the normal state where all of our data is shown.

