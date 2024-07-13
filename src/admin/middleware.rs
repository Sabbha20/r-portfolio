use actix_web::dev::{Service, Transform, ServiceRequest, ServiceResponse, forward_ready};
use actix_web::Error;
use futures::future::{LocalBoxFuture, Ready};
// use futures::FutureExt;
// use std::task::{Context, Poll};

pub struct AdminAuthMiddleware;

impl<S, B> Transform<S, ServiceRequest> for AdminAuthMiddleware
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type InitError = ();
    type Transform = AdminAuthMiddlewareService<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        futures::future::ok(AdminAuthMiddlewareService { service })
    }
}

pub struct AdminAuthMiddlewareService<S> {
    service: S,
}

impl<S, B> Service<ServiceRequest> for AdminAuthMiddlewareService<S>
where
    S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error>,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        // Implement your authentication logic here
        // For example, check for a session cookie or an Authorization header
        if let Some(auth_header) = req.headers().get("Authorization") {
            if auth_header == "Bearer admin-token" {
                let fut = self.service.call(req);
                Box::pin(async move {
                    let res = fut.await?;
                    Ok(res)
                })
            } else {
                Box::pin(async move {
                    Err(actix_web::error::ErrorUnauthorized("Invalid token"))
                })
            }
        } else {
            Box::pin(async move {
                Err(actix_web::error::ErrorUnauthorized("No authorization token"))
            })
        }
    }
}