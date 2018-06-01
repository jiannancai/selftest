package com.ecut.upload;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


public class UploadExcelService {
    private static final String XLS = "xls";
    private static final String XLSX = "xlsx";
    private HashSet<String> fieldSet = new HashSet<>();

    private String[] head;
    public Workbook getWorkBook(String fileName ,InputStream is) throws IOException {
        Workbook workbook = null;
        if (fileName.endsWith(XLS)) {
            workbook = new HSSFWorkbook(is);
        } else if (fileName.endsWith(XLSX)) {
            workbook = new XSSFWorkbook(is);
        }
        return workbook;
    }
    public String getCellValue(Cell cell) {
        String cellValue = "";
        if (cell == null) {
            return cellValue;
        }
        switch (cell.getCellType()) {
        case Cell.CELL_TYPE_NUMERIC: // 数字
            if(HSSFDateUtil.isCellDateFormatted(cell)){
            	cellValue = DateUtil.getJavaDate(cell.getNumericCellValue()).toString();
            }else{
            	cellValue = cell.getNumericCellValue()+"";
            }
            break;
        case Cell.CELL_TYPE_STRING: // 字符串
            cellValue = String.valueOf(cell.getStringCellValue());
            break;
        case Cell.CELL_TYPE_BOOLEAN: // Boolean
            cellValue = String.valueOf(cell.getBooleanCellValue());
            break;
        case Cell.CELL_TYPE_FORMULA: // 公式
//            cellValue = String.valueOf(cell.getNumericCellValue());
            cell.setCellType(1);
            cellValue = cell.getStringCellValue().trim();
            break;
        case Cell.CELL_TYPE_BLANK: // 空值
            cellValue = "";
            break;
        case Cell.CELL_TYPE_ERROR: // 故障
            cellValue = "非法字符";
            break;
        default:
            cellValue = "未知类型";
            break;
        }
        return cellValue;
    }
    public <T>  List<T> toObjectList(List<Map<String, Object>> list,Class<T> clazz) throws Exception{
        List<T> returnList = new LinkedList<T>();
        for(int i=0;i<list.size();i++){
            Set<Map.Entry<String, Object>> set =  list.get(i).entrySet();
            Iterator<Entry<String, Object>> it = set.iterator();
            T obj= clazz.newInstance();
            Field[] field = obj.getClass().getDeclaredFields();
            while(it.hasNext()){//生成一个obj
                Map.Entry<String, Object> entry = (Map.Entry<String, Object>) it.next();
                for(int j=0; j <field.length; j++) {
                    String name = field[j].getName();
                    if(name.equals(entry.getKey().toString())) {
                        name = name.substring(0, 1).toUpperCase() + name.substring(1);
                        String type = field[j].getGenericType().toString();
                        if (type.equals("class java.lang.String")) { // 如果type是类类型，则前面包含"class "，后面跟类名
                            Method m = obj.getClass().getMethod("set"+name,String.class);
                            m.invoke(obj,String.valueOf(entry.getValue()));
                        } else if (type.equals("class java.lang.Integer")) {
                            Method m = obj.getClass().getMethod("set"+name,Integer.class);
                            m.invoke(obj, Integer.valueOf(String.valueOf(entry.getValue())));
                        } else if (type.equals("class java.lang.Boolean")) {
                            Method m = obj.getClass().getMethod("set"+name,Boolean.class);
                            m.invoke(obj, Boolean.valueOf(String.valueOf(entry.getValue())));
                        } else if (type.equals("class java.lang.Long")) {
                            Method m = obj.getClass().getMethod("set"+name,Long.class);
                            m.invoke(obj, Long.valueOf(String.valueOf(entry.getValue())));
                        }
                        break;
                    }
                }
            }
            returnList.add(obj);
        }
        return returnList;
    }
    public void getClassField(Class<?> clazz) {

        fieldSet.clear();
        try {
            for (Field fd : clazz.getDeclaredFields()){
                fieldSet.add(fd.getName());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    protected String toCamel(String item) {
        String[] word = item.split("_");
        if (word == null || word.length == 0) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        sb.append(word[0].toLowerCase());
        for (int i = 1; i < word.length; i++) {
            if (word[i].equals("")) {
                continue;
            }
            sb.append(word[i].substring(0, 1).toUpperCase());
            sb.append(word[i].substring(1).toLowerCase());
        }
        return sb.toString();
    }
    public String[] validateTemplate(String headLine, Class<?> clazz) {
        if (clazz != null) {
            getClassField(clazz);
        }
        head = headLine.split(",");
        for (int i = 0; i < head.length; i++) {
            head[i] = toCamel(head[i]);
            if (!fieldSet.contains(head[i]) && clazz != null) {
                return null;
            }
        }
        return head;
    }
    public String resolveExcel(String fileName ,InputStream is) throws Exception {
        return "FAILED";
    }
}
