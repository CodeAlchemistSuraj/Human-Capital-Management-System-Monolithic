package com.hrms.service.impl;

import com.hrms.exception.ResourceNotFoundException;
import com.hrms.model.SystemSetting;
import com.hrms.repository.SystemSettingRepository;
import com.hrms.service.SystemSettingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SystemSettingServiceImpl implements SystemSettingService {

    @Autowired
    private SystemSettingRepository systemSettingRepository;

    @Override
    public List<SystemSetting> getAllSettings() {
        return systemSettingRepository.findAll();
    }

    @Override
    public SystemSetting getSettingByKey(String key) {
        Optional<SystemSetting> optionalSetting = systemSettingRepository.findBySettingKey(key);
        return optionalSetting.orElseThrow(() -> new ResourceNotFoundException("Setting not found with key: " + key));
    }

    @Override
    public SystemSetting updateSetting(String key, String value) {
        Optional<SystemSetting> optionalSetting = systemSettingRepository.findBySettingKey(key);
        SystemSetting setting = optionalSetting.orElseGet(() -> {
            SystemSetting newSetting = new SystemSetting();
            newSetting.setSettingKey(key);
            return newSetting;
        });
        setting.setSettingValue(value);
        return systemSettingRepository.save(setting);
    }

	@Override
	public <T> Optional<T> getSettingValue(String key, Class<T> type) {
		// TODO Auto-generated method stub
		return Optional.empty();
	}
}