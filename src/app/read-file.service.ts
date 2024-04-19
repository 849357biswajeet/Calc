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
    return this.http.get('assets/biswa.xlsx', { responseType: 'arraybuffer' })
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


  exportToExcel(fileName?: string, data?: any): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName ?? "DATA");
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  }


}
