I show you how to generate end user certificate signed by intermediate certificate in PEM format.

You need to execute 3 steps
1.  Create intermediate certificate
2.  Create certificate signing request CSR
3.  Sign the certificate

## Create intermediate certificate (self signed)

First you need to generate certificate that will be used for signing. For test purposes you generate self signed cert. Let's execute command that creates private key along with public cert.
```
openssl req -newkey rsa:2048 -keyout server.key -x509 -new -nodes -out server.pem \
-subj "/CN=domain.com/O=owner" -days 365
```

## Create certificate signing request CSR
Second you need to create signing request for your end user certificate.
```
openssl req -new -newkey rsa:2048 -nodes -keyout client.key -out client_csr.pem \
-subj "/CN=client.com/O=client" 
```
The command produces request in pem format:
```
-----BEGIN CERTIFICATE REQUEST-----
MIICazCCAVMCAQAwJjETMBEGA1UEAwwKY2xpZW50LmNvbTEPMA0GA1UECgwGY2xp
ZW50MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAGAiw94de/0Iy0B
3zG+6yWA0S+CKku37IMQIMGL6TtrX7tq+sa3cPsLVpPqaVvAdNjhT6xHNz6WBsAW
0Jqa3ZlutifB4777AiD6gH5ZzUyJbXN9ItjA1UOjYkiXqkLDuqFAOOGnRwdJCZZC
FY+pM6BP6TkJk0SeLm4gBICi4uMGiANm8xcWsTrx4K3XEn2Zt0K/JqOiIYUF2jJ4
76kji2nE6/t/YadGslivm16yiqukHvznffJ+OxUC4P+OCJXHSskD6aZ/m0uQYrA1
pxSz636Pvk2WdoU3aDttqly7Zwwd2Fzn7IWzuMDu7eMOwuWuZepm5sELCm1z47zk
WgbgIwIDAQABoAAwDQYJKoZIhvcNAQELBQADggEBAC/NR3JGZJW7ujVzxTdMZOH7
tyJwubQzVir1HAqhSy5xH6i+njKk8rvZusaoUZNlg/ZNlExJvcd8i8wr9Bwqtujl
Ox0aUeQgK56+yy5ucnnHCxuCcIZ4NwTnnZ8BsKNI00SNFNL3OGMNn3KXL4pM3yE9
fdC4mcRhSmC2P/+lazem4qtAzJoVfhpxw6N39aFRzY1H5s7quODbYnaYg67Nyr0i
IPUJLRgvTY+2/P+CDHhcQeyZvRURBjYhfUoaBs127lk0rqUg8FWiXmGudkRYcxk0
rhMz+BYQ8+Ak80L8z9+2NB4DUNu+XfrhB3eFqmnAB2GrYjNfMQ9p7TWg3oVa98M=
-----END CERTIFICATE REQUEST-----
```

## Sign the certificate
The last step is to sign the request
```
openssl x509 -req -in client_csr.pem -CA server.pem -CAkey server.key -CAcreateserial \
-out client.pem -days 365
```
The end user certificate is created. You can check it:
```
openssl x509 -in client.pem -text -noout
```
```
Certificate:
    Data:
        Version: 1 (0x0)
        Serial Number:
            2b:da:d2:82:1d:32:1e:35:1b:aa:c1:28:2f:6a:90:d9:cc:a2:50:b6
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN = domain.com, O = owner
        Validity
            Not Before: Feb  1 22:38:14 2022 GMT
            Not After : Feb  1 22:38:14 2023 GMT
        Subject: CN = client.com, O = client
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                RSA Public-Key: (2048 bit)
                Modulus:
                    00:a8:01:...
                Exponent: 65537 (0x10001)
    Signature Algorithm: sha256WithRSAEncryption
         22:9c:ce:...
-----BEGIN CERTIFICATE-----
MIIC0jCCAboCFCva0oIdMh41G6rBKC9qkNnMolC2MA0GCSqGSIb3DQEBCwUAMCUx
EzARBgNVBAMMCmRvbWFpbi5jb20xDjAMBgNVBAoMBW93bmVyMB4XDTIyMDIwMTIy
MzgxNFoXDTIzMDIwMTIyMzgxNFowJjETMBEGA1UEAwwKY2xpZW50LmNvbTEPMA0G
A1UECgwGY2xpZW50MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqAGA
iw94de/0Iy0B3zG+6yWA0S+CKku37IMQIMGL6TtrX7tq+sa3cPsLVpPqaVvAdNjh
T6xHNz6WBsAW0Jqa3ZlutifB4777AiD6gH5ZzUyJbXN9ItjA1UOjYkiXqkLDuqFA
OOGnRwdJCZZCFY+pM6BP6TkJk0SeLm4gBICi4uMGiANm8xcWsTrx4K3XEn2Zt0K/
JqOiIYUF2jJ476kji2nE6/t/YadGslivm16yiqukHvznffJ+OxUC4P+OCJXHSskD
6aZ/m0uQYrA1pxSz636Pvk2WdoU3aDttqly7Zwwd2Fzn7IWzuMDu7eMOwuWuZepm
5sELCm1z47zkWgbgIwIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQAinM4E/otmWufs
4nes1TmkR/6mP+bDVaIGY5GTMCm5bPsQwXeROPGJizRA6+CdGMjHFWuabIAexsDc
Hgk59KQaJeKH8DiMU6kownYVN4IYpLymHa2P8FPbmWMjVRUqk+fiXjCpPmmIXw/T
bTrUl7VBD3Q8Ej/vTltzYDq+EWK3Q9F467zJeW+Hh/TZ/q1Hs3J7tpotQxsgBReF
y02yasiypW+kcjr1DI5I0lGXvN7XNXXGTEQRl+wTDVJaDwhYJweclhcN6NInROmK
CVGFOQuQF/HmTstsDjs/rwl2vI707qXA6M0oVSHWnArly0enGlMxRLTEmrLFEO9q
H0grzhq6
-----END CERTIFICATE-----
```
## Links:

- https://knowledge.digicert.com/solution/SO16297.html
- https://www.openssl.org/docs/man1.1.1/
