use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::BufReader;
use serde_json;
// use serde_json::from_reader;


#[derive(Serialize, Deserialize)]
pub struct Resume {
    name: String,
    heading: String,
    services: Vec<Services>,
    pub tag: Vec<String>,
    contact: Contact,
    summary: Vec<String>,
    skills: Vec<Skills>,
    experience: Vec<Experience>,
    education: Education,
}

#[derive(Serialize, Deserialize)]
pub struct Contact {
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
}

#[derive(Serialize, Deserialize)]
pub struct Experience {
    title: String,
    company: String,
    duration: String,
    responsibilities: Vec<String>,
}

#[derive(Serialize, Deserialize)]
pub struct Education {
    degree: String,
    institution: String,
    duration: String,
    result: String,
}

#[derive(Serialize, Deserialize)]
pub struct Services {
    title: String,
    description: String,
    gif: String,
    fas: String,
}

#[derive(Serialize, Deserialize)]
pub struct Skills {
    name: String,
    icon: String,
}

pub fn read_resume_from_file(path: &str) -> Result<Resume, Box<dyn std::error::Error>> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let resume = serde_json::from_reader(reader)?;
    Ok(resume)
}

pub fn p_data() -> Resume {
    let resume = read_resume_from_file(".data.json").expect("Could not read JSON file");
    resume
}

