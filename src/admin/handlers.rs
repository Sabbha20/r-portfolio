use actix_web::{web, HttpResponse, Responder};
use tera::{Tera, Context};
use crate::data::data::p_data;

pub async fn dashboard(tmpl: web::Data<Tera>) -> impl Responder {
    let mut context = Context::new();
    context.insert("title", "Admin Dashboard");
    let data = p_data();
    context.insert("projects_count", &data.services.len()); // Adjust as needed
    context.insert("skills_count", &data.skills.len());
    context.insert("services_count", &data.services.len());
    let rendered = tmpl.render("admin/admin.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

pub async fn profile(tmpl: web::Data<Tera>) -> impl Responder {
    let mut context = Context::new();
    context.insert("title", "Edit Profile");
    context.insert("data", &p_data());
    let rendered = tmpl.render("admin/profile.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

pub async fn projects(tmpl: web::Data<Tera>) -> impl Responder {
    let mut context = Context::new();
    context.insert("title", "Manage Projects");
    context.insert("data", &p_data());
    let rendered = tmpl.render("admin/projects.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

pub async fn skills(tmpl: web::Data<Tera>) -> impl Responder {
    let mut context = Context::new();
    context.insert("title", "Manage Skills");
    context.insert("data", &p_data());
    let rendered = tmpl.render("admin/skills.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

pub async fn services(tmpl: web::Data<Tera>) -> impl Responder {
    let mut context = Context::new();
    context.insert("title", "Manage Services");
    context.insert("data", &p_data());
    let rendered = tmpl.render("admin/services.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

pub async fn logout() -> impl Responder {
    // Implement logout logic here
    HttpResponse::Ok().body("Logged out successfully")
}