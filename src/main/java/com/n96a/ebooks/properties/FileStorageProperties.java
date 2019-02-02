package com.n96a.ebooks.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    private String ebooksDir;
    private String thumbnailsDir;

    public String getEbooksDir() {
        return ebooksDir;
    }

    public void setEbooksDir(String ebooksDir) {
        this.ebooksDir = ebooksDir;
    }

    public String getThumbnailsDir() {
        return thumbnailsDir;
    }

    public void setThumbnailsDir(String thumbnailsDir) {
        this.thumbnailsDir = thumbnailsDir;
    }


}
