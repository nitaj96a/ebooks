package com.n96a.ebooks.DTO;

import com.n96a.ebooks.model.User;

public class UserDTO {
    private Integer id;
    private String username;
    private String firstName;
    private String lastName;
    private String type;
    private String token;

    public UserDTO() {
    }

    public UserDTO(Integer id, String username, String firstName, String lastName, String type, String token) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.type = type;
        this.token = token;
    }

    public UserDTO(User user) {
        this(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getType(), "");
    }

    public UserDTO(User user, String token) {
        this(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getType(), token);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "id=" + id +
                ", username='" + username + '\'' +
                '}';
    }
}
