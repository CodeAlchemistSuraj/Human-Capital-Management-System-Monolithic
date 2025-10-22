// File: src/main/java/com/hrms/service/SystemSettingService.java
package com.hrms.service;

import com.hrms.model.SystemSetting;
import java.util.List;
import java.util.Optional; // Import Optional

public interface SystemSettingService {
    List<SystemSetting> getAllSettings();
    SystemSetting getSettingByKey(String key);
    SystemSetting updateSetting(String key, String value);

    /**
     * Retrieves a system setting value by its key and attempts to cast it to the specified type.
     *
     * @param key The key of the system setting.
     * @param type The Class object representing the desired type.
     * @param <T> The type of the setting value.
     * @return An Optional containing the setting value if found and castable, otherwise empty.
     */
    <T> Optional<T> getSettingValue(String key, Class<T> type);
}
