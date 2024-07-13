mod data;
mod admin;

use data::data::p_data;
use actix_files as fs;
use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use tera::{Tera, Context};
use std::env;
use env_logger;
// async fn home() -> impl Responder {
//     HttpResponse::Ok().body("Welcome to Sabbha Mondal's Portfolio")
// }

async fn home(tmpl: web::Data<Tera>) -> impl Responder {
    let mut context = Context::new();
    context.insert("title", "Home Page");
    context.insert("message", "If you are looking for");
    context.insert("data", &p_data());
    let rendered = tmpl.render("index.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}


async fn about(tmpl: web::Data<Tera>) -> impl Responder {
    // HttpResponse::Ok().body("About Sabbha Mondal")
    let mut context = Context::new();
    context.insert("title", "About Page");
    context.insert("data", &p_data());
    let rendered = tmpl.render("about.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

async fn projects() -> impl Responder {
    HttpResponse::Ok().body("Projects will be listed here")
}

async fn contact(tmpl: web::Data<Tera>) -> impl Responder {
    // HttpResponse::Ok().body("@mondal_sabbha contact")
    let mut context = Context::new();
    context.insert("title", "Contact Page");
    context.insert("data", &p_data());
    let rendered = tmpl.render("contact.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

async fn get_phrases() -> impl Responder {
    let phrases = &p_data().tag.clone();
    HttpResponse::Ok().json(phrases)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();

    // Initialize tera template engine
    let tera = Tera::new("templates/**/*").expect("Error parsing templates directory");


    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(tera.clone())) // Make tera available to handlers
            .service(fs::Files::new("/static", "./static").show_files_listing()) // Serve static files
            .route("/", web::get().to(home))
            .route("/about", web::get().to(about))
            .route("/contact", web::get().to(contact))
            .route("/projects", web::get().to(projects))
            .route("/phrases", web::get().to(get_phrases))
            .configure(admin::config)
    })
        .bind("127.0.0.1:8000")?
        .run()
        .await
}
