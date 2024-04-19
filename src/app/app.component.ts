import { Component, OnInit } from '@angular/core';
import { ReadFileService } from './read-file.service';

class ExcelModel{
  itemNumber: string | undefined;
  itemName: string | undefined;
  mrp: string | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  companyName: string | undefined;
  quotationNumber: string | undefined;
  selectedItemNumber: any;

  excelModel : ExcelModel[] | undefined; 
  

  items: any[] = [
    // // Sample data
    // { serialNumber: 1, itemNumber: 'ABC123', itemName: 'Item 1', quantity: 5, mrp: 100, discount: 10, rate: 90, value: 450, remark: '' },
    // { serialNumber: 2, itemNumber: 'XYZ456', itemName: 'Item 2', quantity: 3, mrp: 150, discount: 15, rate: 135, value: 405, remark: '' }
  ];

  originalData: any[] = [];
  selectedOption: any;
  itemSerailNumber: string | undefined;


  // Sample arrays of item numbers and names for suggestions
  itemNumbers: string[] = ['ABC123', 'XYZ456', 'DEF789'];
  itemNames: string[] = ['Item 1', 'Item 2', 'Item 3'];

  constructor(private excelService: ReadFileService) {}

  
  ngOnInit(): void {

    this.loadExcelData();
  }

  loadExcelData(){
    this.excelService.readExcelData().then(data => {
      this.excelModel = data;
      console.log(this.excelModel[0].itemName)
    });
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    let xx = this.excelService.readExcel(file);
    console.log(xx);
  }

  fusn(selectedOption: string, serialNumber: string) {
    // Perform operations based on the selected option
    console.log('Selected option:', selectedOption);
    console.log('Selected option:',serialNumber);

    this.items.forEach(data=>{
      if(data.serialNumber === serialNumber){
        data.mrp = 99999;
      }
    })
    
  }

  onItemSelect(selectedData: any) {
    // Do something with the selected data object
    console.log(selectedData.target.value);
    // You can pass it to a function, store it in a variable, etc.
  }

  selectedOptions: any;
  fun(selectedOption: any, itemSerialNumber: string) {
    // Perform operations based on the selected option and item serial number
    console.log('Selected option:', selectedOption);
    console.log('Item serial number:', itemSerialNumber);
    // Example operation: Display the selected option's item number
    if (selectedOption) {
      console.log('Selected item number:', selectedOption.itemNumber);
    }
  }
  
  addItem() {
    this.items.push({
      serialNumber: this.items.length + 1,
      itemNumber: '',
      itemName: '',
      quantity: 0,
      mrp: 0,
      discount: 0,
      rate: 0,
      value: 0,
      remark: ''
    });
  }

  deleteItem(item: any) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
