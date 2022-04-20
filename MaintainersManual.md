# How to Add/Update a Fellowship
#### The CCPD fellowships Google sheets: https://docs.google.com/spreadsheets/d/1WN6xjN9baqx9vf3Wit8rj0IxtzG85MTNEpdJXYlmuFU/edit <br/>

When editing or adding a fellowship to the SU CCPD fellowships site, it is important to modify both Sheet 1 and Sheet 2 in tandem and to make sure that both sheets are accurate (make sure that information on one sheet does not contradict the information on the other sheet). It is also important that you do not change any of the column names as that may break the website.

## Format to follow when editing Sheet 1:
Sheet 1 is how the fellowship information will be displayed to the website visitors. The format to follow is pretty lenient for this sheet:

### Strict guidelines to follow:
#### ** Do NOT change the column names**
```
* fellowship_id: the fellowship’s unique identifier
    * Make sure that when adding a new fellowship the fellowship_id column has a numerical value that no other fellowship has already been assigned.
    * We recommend following the increasing numerical order that has already been followed with the other fellowship_id values.
* Make sure that when removing a fellowship the entire row is deleted.
* If a fellowship does not offer any information about a column, leave the value blank under that column.
```
### Lenient guidelines:
```
The values on this sheet will be displayed on the webpage as is, so enter the values however you want them displayed:
- Grammar
- Punctuation
- Capitalization
```

## Format to follow when editing Sheet 2:
Sheet 2 is invisible on the website, no one will need to see it except the code itself. 

## Update the package.json file
1. Download this document as a Microsoft Excel file (.xlxs)
2. Go to this URL: https://products.aspose.app/cells/conversion
3. Upload the fellowships-excel.xlxs file that you downloaded earlier.
4. Switch the "Save As" option from PDF to JSON.
5. Convert the excel file to json
6. Click the "Download Now" option to download the newly converted file.
7. Go to the package.json file of this project.
8. Copy and paste the contents of the fellowships-excel.json file into package.json
9. Save and push your changes and you're done! :)