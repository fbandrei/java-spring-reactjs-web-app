package com.symw.payloads;

public class UserIdentityAvailability {
    private Boolean isAvailable;

    public UserIdentityAvailability(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }
}
