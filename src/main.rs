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
    context.insert("message", "Welcome to Sabbha Mondal's Portfolio");

    let rendered = tmpl.render("index.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

async fn about(tmpl: web::Data<Tera>) -> impl Responder {
    // HttpResponse::Ok().body("About Sabbha Mondal")
    let mut context = Context::new();
    context.insert("title", "About Page");
    context.insert("message", "About Sabbha Mondal");

    let rendered = tmpl.render("index.html", &context).unwrap();
    HttpResponse::Ok().body(rendered)
}

async fn projects() -> impl Responder {
    HttpResponse::Ok().body("Projects will be listed here")
}

async fn contact() -> impl Responder {
    HttpResponse::Ok().body("@mondal_sabbha contact")
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
            .service(fs::Files::new("/static", "static").show_files_listing()) // Serve static files
            .route("/", web::get().to(home))
            .route("/about", web::get().to(about))
            .route("/contact", web::get().to(contact))
            .route("/projects", web::get().to(projects))
    })
        .bind("127.0.0.1:8000")?
        .run()
        .await
}
