package com.ecut.upload;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.ecut.pojo.Student;

public class UploadExcelUtil {

	private FormulaEvaluator evaluator;
    private final static String excel2003L =".xls";    //2003- 版本的excel
    private final static String excel2007U =".xlsx";   //2007+ 版本的excel

    /**
     * 描述：获取IO流中的数据，组装成List<List<Object>>对象
     * @param in,fileName
     * @return
     * @throws IOException 
     */
    public  List<List<Object>> getBankListByExcel(InputStream in,String fileName) throws Exception{
        List<List<Object>> list = null;

        //创建Excel工作薄
        Workbook work = this.getWorkbook(in,fileName);
        if(null == work){
            throw new Exception("创建Excel工作薄为空！");
        }
        Sheet sheet = null;
        Row row = null;
        Cell cell = null;
        evaluator = work.getCreationHelper().createFormulaEvaluator();   
        list = new ArrayList<List<Object>>();
        //遍历Excel中所有的sheet
        for (int i = 0; i < work.getNumberOfSheets(); i++) {
            sheet = work.getSheetAt(i);
            if(sheet==null){continue;}

            //遍历当前sheet中的所有行
            for (int j = sheet.getFirstRowNum(); j <= sheet.getLastRowNum(); j++) {
                row = sheet.getRow(j);
                if(row==null||row.getFirstCellNum()==j){continue;}

                //遍历所有的列
                List<Object> li = new ArrayList<Object>();
                for (int y = row.getFirstCellNum(); y < row.getLastCellNum(); y++) {
                    cell = row.getCell(y);
                    li.add(this.getCellValue(cell));
                }
                list.add(li);
            }
        }
        return list;
    }

    /**
     * 描述：根据文件后缀，自适应上传文件的版本 
     * @param inStr,fileName
     * @return
     * @throws Exception
     */
    public  Workbook getWorkbook(InputStream inStr,String fileName) throws Exception{
        Workbook wb = null;
        String fileType = fileName.substring(fileName.lastIndexOf("."));
        if(excel2003L.equals(fileType)){
            wb = new HSSFWorkbook(inStr);  //2003-
        }else if(excel2007U.equals(fileType)){
            wb = new XSSFWorkbook(inStr);  //2007+
        }else{
            throw new Exception("解析的文件格式有误！");
        }
        return wb;
    }

    /**
     * 描述：对表格中数值进行格式化
     * @param cell
     * @return
     */
    public  Object getCellValue(Cell cell){
        Object value = null;
        DecimalFormat df = new DecimalFormat("0");  //格式化number String字符
        SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");  //日期格式化
        DecimalFormat df2 = new DecimalFormat("0.00");  //格式化数字

        switch (cell.getCellType()) {
        case Cell.CELL_TYPE_STRING:
            value = cell.getRichStringCellValue().getString();
            break;
        case Cell.CELL_TYPE_NUMERIC:
            if("General".equals(cell.getCellStyle().getDataFormatString())){
                value = df.format(cell.getNumericCellValue());
            }else if("m/d/yy".equals(cell.getCellStyle().getDataFormatString())){
                value = sdf.format(cell.getDateCellValue());
            }else{
                value = df2.format(cell.getNumericCellValue());
            }
            break;
        case Cell.CELL_TYPE_FORMULA:
            value = getCellValue(evaluator.evaluate(cell));
            break;
        case Cell.CELL_TYPE_BOOLEAN:
            value = cell.getBooleanCellValue();
            break;
        case Cell.CELL_TYPE_BLANK:
            value = "";
            break;
        default:
            break;
        }
        return value;
    }
    
    public  Object getCellValue(CellValue cell){  
    	Object value = null;  
    	
        switch (cell.getCellType()) {  
        case Cell.CELL_TYPE_STRING:  
            value = cell.getStringValue();
            break;  
        case Cell.CELL_TYPE_NUMERIC:  
            value = cell.getNumberValue();
            break;
        case Cell.CELL_TYPE_BOOLEAN:  
            value = cell.getBooleanValue();
            break;  
        case Cell.CELL_TYPE_BLANK:  
            value = "";  
            break;  
        default:  
            break;  
        }  
        return value; 
    }

	/*	public ArrayList<Student> excelTo(String URL) throws IOException{
        //创建list集合存放对象
        ArrayList<Student> list = new ArrayList<Student>();
    
        File file = new File(URL);

        if(file.exists()) {
        	System.out.println("有这个文件");
        }else {
        	System.out.println("没有这个文件");
        }
        Workbook workbook=null;
        try {
            workbook = WorkbookFactory.create(file);
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
        //代码解释：读取默认第一个工作表sheet
        Sheet sheet =  workbook.getSheetAt(0);
        //代码解释：获取sheet中最后一行行号
        int lastRowNum = sheet.getLastRowNum();
       // System.out.println("lastRowNum========="+lastRowNum);
        //代码解释：循环所有行
        ArrayList<String> list2 = new ArrayList<String>();
        for (int i = 1; i <= lastRowNum; i++) {
            //代码解释：获取当前行中的内容
            Row row = sheet.getRow(i);
            short cell = row.getLastCellNum();
          //  System.out.println("cellnumber======="+cell);
            if(row !=null && cell!=0){
                for(int j=0;j<cell;j++){
                    Student student=new Student();
                    Cell name=row.getCell(j);
                    student.setName(getValue(name));
                    list.add(student);
                }
            }
        }
        return list;
    }
    //取单元格中的值
    public String getValue(Cell cell){
        String result="";
        if(cell.getCellType() == cell.CELL_TYPE_BOOLEAN){
            //返回布尔类型的值
            result = cell.getBooleanCellValue() +"";
        }else if(cell.getCellType() == cell.CELL_TYPE_NUMERIC){
            //返回数值类型的值
            if(HSSFDateUtil.isCellDateFormatted(cell)){
                result = DateUtil.getJavaDate(cell.getNumericCellValue()).toString();
            }else{
                result = cell.getNumericCellValue()+"";
            }
            return String.valueOf(cell.getNumericCellValue());
        }else if(cell.getCellType() == cell.CELL_TYPE_FORMULA){
            result = cell.getCellFormula();
        }else if(cell.getCellType() == cell.CELL_TYPE_STRING){
            result = cell.getStringCellValue();
        }else{
            //返回字符口串类型的值
            result = cell.getStringCellValue();
        }
        return result;
    }
*/
}
