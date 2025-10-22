package com.hrms.service;

import com.hrms.model.ManpowerRecord;

import java.util.List;

public interface ManpowerService {
    ManpowerRecord addManpowerRecord(ManpowerRecord manpowerRecord);
    List<ManpowerRecord> getAllManpowerRecords();
    ManpowerRecord getManpowerRecordById(Long id);
    ManpowerRecord updateManpowerRecord(Long id, ManpowerRecord manpowerRecord);
    void deleteManpowerRecord(Long id);
    List<ManpowerRecord> getManpowerRecordsByEmployeeId(Long employeeId);
    List<ManpowerRecord> getManpowerRecordsByDepartment(String department);
    List<ManpowerRecord> getManpowerRecordsByIsOutsourced(Boolean isOutsourced);
}