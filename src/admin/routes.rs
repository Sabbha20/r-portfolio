use actix_web::web;
use super::handlers;
use super::middleware::AdminAuthMiddleware;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/admin")
            .wrap(AdminAuthMiddleware)
            .route("", web::get().to(handlers::dashboard))
            .route("/profile", web::get().to(handlers::profile))
            .route("/projects", web::get().to(handlers::projects))
            .route("/skills", web::get().to(handlers::skills))
            .route("/services", web::get().to(handlers::services))
            .route("/logout", web::get().to(handlers::logout))
    );
}