package com.demo;

public class Task {
    private int id;
    private String name;
    private String description;
    private int status;  //Use int for status 0 for incomplete | 1 for complete (don't know if better option available)

    //Getters and setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }
}