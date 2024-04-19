// excel.service.ts

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadFileService {

  constructor(private http: HttpClient) { }

  public readExcelData(): Promise<any[]> {
    return this.http.get('assets/mydata.xlsx', { responseType: 'arraybuffer' })
      .toPromise()
      .then((buffer?: ArrayBuffer) => {
        const data: any[] = [];
        const workbook: XLSX.WorkBook = XLSX.read(buffer, { type: 'array' });
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
        XLSX.utils.sheet_to_json(worksheet, { raw: true }).forEach(row => data.push(row));
        return data;
      });
  }

  public readExcel(file: File): any[] {
    const reader: FileReader = new FileReader();
    let data: any[] = [];

    reader.onload = (e: any) => {
      const binaryString: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
    };

    reader.readAsBinaryString(file);

    return data;
  }
}
