## SSL (HTTPS with machine-signed certs)

This directory holds local _machine-signed_ certs localhost certs for dev deployment and testing of the development and production builds.

on local machines. **These are not the real SSL certs for production deployment**, those are managed by Nginx and stored only on the production machine

### Machine Signed Certs with mkcert

Successfully generating the machine-signed certs will log something like the following,

```bash
Created a new certificate valid for the following names 📜
 - "localhost"

The certificate is at ".certs/cert.crt" and the key at ".certs/key.pem" ✅

It will expire on 23 July 2025 🗓
```
