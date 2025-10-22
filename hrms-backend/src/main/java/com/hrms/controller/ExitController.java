package com.hrms.controller;

import com.hrms.model.ExitProcess;
import com.hrms.service.ExitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exit")
public class ExitController {

    @Autowired
    private ExitService exitService;

    @PostMapping
    public ResponseEntity<ExitProcess> initiateExitProcess(@RequestBody ExitProcess exitProcess) {
        return ResponseEntity.ok(exitService.initiateExitProcess(exitProcess));
    }

    @GetMapping
    public ResponseEntity<List<ExitProcess>> getAllExitProcesses() {
        return ResponseEntity.ok(exitService.getAllExitProcesses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExitProcess> getExitProcessById(@PathVariable Long id) {
        return ResponseEntity.ok(exitService.getExitProcessById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExitProcess> updateExitProcess(@PathVariable Long id, @RequestBody ExitProcess exitProcess) {
        return ResponseEntity.ok(exitService.updateExitProcess(id, exitProcess));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExitProcess(@PathVariable Long id) {
        exitService.deleteExitProcess(id);
        return ResponseEntity.noContent().build();
    }
}