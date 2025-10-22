package com.hrms.controller;

import com.hrms.model.ManpowerRecord;
import com.hrms.service.ManpowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manpower")
public class ManpowerController {

    @Autowired
    private ManpowerService manpowerService;

    @PostMapping
    public ResponseEntity<ManpowerRecord> addManpowerRecord(@RequestBody ManpowerRecord manpowerRecord) {
        return ResponseEntity.ok(manpowerService.addManpowerRecord(manpowerRecord));
    }

    @GetMapping
    public ResponseEntity<List<ManpowerRecord>> getAllManpowerRecords() {
        return ResponseEntity.ok(manpowerService.getAllManpowerRecords());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManpowerRecord> getManpowerRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(manpowerService.getManpowerRecordById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManpowerRecord> updateManpowerRecord(@PathVariable Long id, @RequestBody ManpowerRecord manpowerRecord) {
        return ResponseEntity.ok(manpowerService.updateManpowerRecord(id, manpowerRecord));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManpowerRecord(@PathVariable Long id) {
        manpowerService.deleteManpowerRecord(id);
        return ResponseEntity.noContent().build();
    }
}