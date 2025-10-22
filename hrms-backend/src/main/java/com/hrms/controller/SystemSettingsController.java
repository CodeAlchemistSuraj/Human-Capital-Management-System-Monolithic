package com.hrms.controller;

import com.hrms.model.SystemSetting;
import com.hrms.service.SystemSettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@PreAuthorize("hasRole('ADMIN')")
public class SystemSettingsController {

    @Autowired
    private SystemSettingService systemSettingService;

    @GetMapping
    public ResponseEntity<List<SystemSetting>> getAllSettings() {
        return ResponseEntity.ok(systemSettingService.getAllSettings());
    }

    @GetMapping("/{key}")
    public ResponseEntity<SystemSetting> getSettingByKey(@PathVariable String key) {
        return ResponseEntity.ok(systemSettingService.getSettingByKey(key));
    }

    @PutMapping("/{key}")
    public ResponseEntity<SystemSetting> updateSetting(@PathVariable String key, @RequestBody String value) {
        return ResponseEntity.ok(systemSettingService.updateSetting(key, value));
    }
}