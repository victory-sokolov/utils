[**@vsokolov/utils v1.4.2**](../index.md)

***

[@vsokolov/utils](../modules.md) / StatusCodes

# Enumeration: StatusCodes

Defined in: [http-status.ts:1](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L1)

## Enumeration Members

### CONTINUE

> **CONTINUE**: `100`

Defined in: [http-status.ts:7](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L7)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.1

This interim response indicates that everything so far is OK and that the client should continue with the request or ignore it if it is already finished.

***

### SWITCHING\_PROTOCOLS

> **SWITCHING\_PROTOCOLS**: `101`

Defined in: [http-status.ts:13](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L13)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.2.2

This code is sent in response to an Upgrade request header by the client, and indicates the protocol the server is switching too.

***

### PROCESSING

> **PROCESSING**: `102`

Defined in: [http-status.ts:19](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L19)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.1

This code indicates that the server has received and is processing the request, but no response is available yet.

***

### EARLY\_HINTS

> **EARLY\_HINTS**: `103`

Defined in: [http-status.ts:25](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L25)

Official Documentation @ https://www.rfc-editor.org/rfc/rfc8297#page-3

This code indicates to the client that the server is likely to send a final response with the header fields included in the informational response.

***

### OK

> **OK**: `200`

Defined in: [http-status.ts:35](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L35)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.1

The request has succeeded. The meaning of a success varies depending on the HTTP method:
GET: The resource has been fetched and is transmitted in the message body.
HEAD: The entity headers are in the message body.
POST: The resource describing the result of the action is transmitted in the message body.
TRACE: The message body contains the request message as received by the server

***

### CREATED

> **CREATED**: `201`

Defined in: [http-status.ts:41](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L41)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.2

The request has succeeded and a new resource has been created as a result of it. This is typically the response sent after a PUT request.

***

### ACCEPTED

> **ACCEPTED**: `202`

Defined in: [http-status.ts:47](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L47)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.3

The request has been received but not yet acted upon. It is non-committal, meaning that there is no way in HTTP to later send an asynchronous response indicating the outcome of processing the request. It is intended for cases where another process or server handles the request, or for batch processing.

***

### NON\_AUTHORITATIVE\_INFORMATION

> **NON\_AUTHORITATIVE\_INFORMATION**: `203`

Defined in: [http-status.ts:53](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L53)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.4

This response code means returned meta-information set is not exact set as available from the origin server, but collected from a local or a third party copy. Except this condition, 200 OK response should be preferred instead of this response.

***

### NO\_CONTENT

> **NO\_CONTENT**: `204`

Defined in: [http-status.ts:59](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L59)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.5

There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.

***

### RESET\_CONTENT

> **RESET\_CONTENT**: `205`

Defined in: [http-status.ts:65](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L65)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.3.6

This response code is sent after accomplishing request to tell user agent reset document view which sent this request.

***

### PARTIAL\_CONTENT

> **PARTIAL\_CONTENT**: `206`

Defined in: [http-status.ts:71](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L71)

Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.1

This response code is used because of range header sent by the client to separate download into multiple streams.

***

### MULTI\_STATUS

> **MULTI\_STATUS**: `207`

Defined in: [http-status.ts:77](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L77)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.2

A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.

***

### MULTIPLE\_CHOICES

> **MULTIPLE\_CHOICES**: `300`

Defined in: [http-status.ts:83](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L83)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.1

The request has more than one possible responses. User-agent or user should choose one of them. There is no standardized way to choose one of the responses.

***

### MOVED\_PERMANENTLY

> **MOVED\_PERMANENTLY**: `301`

Defined in: [http-status.ts:89](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L89)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.2

This response code means that URI of requested resource has been changed. Probably, new URI would be given in the response.

***

### MOVED\_TEMPORARILY

> **MOVED\_TEMPORARILY**: `302`

Defined in: [http-status.ts:95](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L95)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.3

This response code means that URI of requested resource has been changed temporarily. New changes in the URI might be made in the future. Therefore, this same URI should be used by the client in future requests.

***

### SEE\_OTHER

> **SEE\_OTHER**: `303`

Defined in: [http-status.ts:101](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L101)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.4

Server sent this response to directing client to get requested resource to another URI with an GET request.

***

### NOT\_MODIFIED

> **NOT\_MODIFIED**: `304`

Defined in: [http-status.ts:107](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L107)

Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.1

This is used for caching purposes. It is telling to client that response has not been modified. So, client can continue to use same cached version of response.

***

### ~~USE\_PROXY~~

> **USE\_PROXY**: `305`

Defined in: [http-status.ts:114](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L114)

#### Deprecated

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.6

Was defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.

***

### TEMPORARY\_REDIRECT

> **TEMPORARY\_REDIRECT**: `307`

Defined in: [http-status.ts:120](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L120)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.4.7

Server sent this response to directing client to get requested resource to another URI with same method that used prior request. This has the same semantic than the 302 Found HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.

***

### PERMANENT\_REDIRECT

> **PERMANENT\_REDIRECT**: `308`

Defined in: [http-status.ts:126](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L126)

Official Documentation @ https://tools.ietf.org/html/rfc7538#section-3

This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.

***

### BAD\_REQUEST

> **BAD\_REQUEST**: `400`

Defined in: [http-status.ts:132](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L132)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.1

This response means that server could not understand the request due to invalid syntax.

***

### UNAUTHORIZED

> **UNAUTHORIZED**: `401`

Defined in: [http-status.ts:138](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L138)

Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.1

Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.

***

### PAYMENT\_REQUIRED

> **PAYMENT\_REQUIRED**: `402`

Defined in: [http-status.ts:144](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L144)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.2

This response code is reserved for future use. Initial aim for creating this code was using it for digital payment systems however this is not used currently.

***

### FORBIDDEN

> **FORBIDDEN**: `403`

Defined in: [http-status.ts:150](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L150)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.3

The client does not have access rights to the content, i.e. they are unauthorized, so server is rejecting to give proper response. Unlike 401, the client's identity is known to the server.

***

### NOT\_FOUND

> **NOT\_FOUND**: `404`

Defined in: [http-status.ts:156](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L156)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.4

The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 to hide the existence of a resource from an unauthorized client. This response code is probably the most famous one due to its frequent occurence on the web.

***

### METHOD\_NOT\_ALLOWED

> **METHOD\_NOT\_ALLOWED**: `405`

Defined in: [http-status.ts:162](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L162)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.5

The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource. The two mandatory methods, GET and HEAD, must never be disabled and should not return this error code.

***

### NOT\_ACCEPTABLE

> **NOT\_ACCEPTABLE**: `406`

Defined in: [http-status.ts:168](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L168)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.6

This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content following the criteria given by the user agent.

***

### PROXY\_AUTHENTICATION\_REQUIRED

> **PROXY\_AUTHENTICATION\_REQUIRED**: `407`

Defined in: [http-status.ts:174](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L174)

Official Documentation @ https://tools.ietf.org/html/rfc7235#section-3.2

This is similar to 401 but authentication is needed to be done by a proxy.

***

### REQUEST\_TIMEOUT

> **REQUEST\_TIMEOUT**: `408`

Defined in: [http-status.ts:180](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L180)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.7

This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to speed up surfing. Also note that some servers merely shut down the connection without sending this message.

***

### CONFLICT

> **CONFLICT**: `409`

Defined in: [http-status.ts:186](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L186)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.8

This response is sent when a request conflicts with the current state of the server.

***

### GONE

> **GONE**: `410`

Defined in: [http-status.ts:192](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L192)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.9

This response would be sent when the requested content has been permenantly deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.

***

### LENGTH\_REQUIRED

> **LENGTH\_REQUIRED**: `411`

Defined in: [http-status.ts:198](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L198)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.10

The server rejected the request because the Content-Length header field is not defined and the server requires it.

***

### PRECONDITION\_FAILED

> **PRECONDITION\_FAILED**: `412`

Defined in: [http-status.ts:204](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L204)

Official Documentation @ https://tools.ietf.org/html/rfc7232#section-4.2

The client has indicated preconditions in its headers which the server does not meet.

***

### REQUEST\_TOO\_LONG

> **REQUEST\_TOO\_LONG**: `413`

Defined in: [http-status.ts:210](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L210)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.11

Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.

***

### REQUEST\_URI\_TOO\_LONG

> **REQUEST\_URI\_TOO\_LONG**: `414`

Defined in: [http-status.ts:216](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L216)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.12

The URI requested by the client is longer than the server is willing to interpret.

***

### UNSUPPORTED\_MEDIA\_TYPE

> **UNSUPPORTED\_MEDIA\_TYPE**: `415`

Defined in: [http-status.ts:222](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L222)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.13

The media format of the requested data is not supported by the server, so the server is rejecting the request.

***

### REQUESTED\_RANGE\_NOT\_SATISFIABLE

> **REQUESTED\_RANGE\_NOT\_SATISFIABLE**: `416`

Defined in: [http-status.ts:228](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L228)

Official Documentation @ https://tools.ietf.org/html/rfc7233#section-4.4

The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is outside the size of the target URI's data.

***

### EXPECTATION\_FAILED

> **EXPECTATION\_FAILED**: `417`

Defined in: [http-status.ts:234](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L234)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.5.14

This response code means the expectation indicated by the Expect request header field can't be met by the server.

***

### IM\_A\_TEAPOT

> **IM\_A\_TEAPOT**: `418`

Defined in: [http-status.ts:240](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L240)

Official Documentation @ https://tools.ietf.org/html/rfc2324#section-2.3.2

Any attempt to brew coffee with a teapot should result in the error code "418 I'm a teapot". The resulting entity body MAY be short and stout.

***

### INSUFFICIENT\_SPACE\_ON\_RESOURCE

> **INSUFFICIENT\_SPACE\_ON\_RESOURCE**: `419`

Defined in: [http-status.ts:246](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L246)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6

The 507 (Insufficient Storage) status code means the method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request. This condition is considered to be temporary. If the request which received this status code was the result of a user action, the request MUST NOT be repeated until it is requested by a separate user action.

***

### ~~METHOD\_FAILURE~~

> **METHOD\_FAILURE**: `420`

Defined in: [http-status.ts:253](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L253)

#### Deprecated

Official Documentation @ https://tools.ietf.org/rfcdiff?difftype=--hwdiff&url2=draft-ietf-webdav-protocol-06.txt

A deprecated response used by the Spring Framework when a method has failed.

***

### MISDIRECTED\_REQUEST

> **MISDIRECTED\_REQUEST**: `421`

Defined in: [http-status.ts:259](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L259)

Official Documentation @ https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.2

Defined in the specification of HTTP/2 to indicate that a server is not able to produce a response for the combination of scheme and authority that are included in the request URI.

***

### UNPROCESSABLE\_ENTITY

> **UNPROCESSABLE\_ENTITY**: `422`

Defined in: [http-status.ts:265](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L265)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.3

The request was well-formed but was unable to be followed due to semantic errors.

***

### LOCKED

> **LOCKED**: `423`

Defined in: [http-status.ts:271](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L271)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.4

The resource that is being accessed is locked.

***

### FAILED\_DEPENDENCY

> **FAILED\_DEPENDENCY**: `424`

Defined in: [http-status.ts:277](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L277)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.5

The request failed due to failure of a previous request.

***

### UPGRADE\_REQUIRED

> **UPGRADE\_REQUIRED**: `426`

Defined in: [http-status.ts:283](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L283)

Official Documentation @ https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.15

The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.

***

### PRECONDITION\_REQUIRED

> **PRECONDITION\_REQUIRED**: `428`

Defined in: [http-status.ts:289](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L289)

Official Documentation @ https://tools.ietf.org/html/rfc6585#section-3

The origin server requires the request to be conditional. Intended to prevent the 'lost update' problem, where a client GETs a resource's state, modifies it, and PUTs it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.

***

### TOO\_MANY\_REQUESTS

> **TOO\_MANY\_REQUESTS**: `429`

Defined in: [http-status.ts:295](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L295)

Official Documentation @ https://tools.ietf.org/html/rfc6585#section-4

The user has sent too many requests in a given amount of time ("rate limiting").

***

### REQUEST\_HEADER\_FIELDS\_TOO\_LARGE

> **REQUEST\_HEADER\_FIELDS\_TOO\_LARGE**: `431`

Defined in: [http-status.ts:301](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L301)

Official Documentation @ https://tools.ietf.org/html/rfc6585#section-5

The server is unwilling to process the request because its header fields are too large. The request MAY be resubmitted after reducing the size of the request header fields.

***

### UNAVAILABLE\_FOR\_LEGAL\_REASONS

> **UNAVAILABLE\_FOR\_LEGAL\_REASONS**: `451`

Defined in: [http-status.ts:307](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L307)

Official Documentation @ https://tools.ietf.org/html/rfc7725

The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.

***

### INTERNAL\_SERVER\_ERROR

> **INTERNAL\_SERVER\_ERROR**: `500`

Defined in: [http-status.ts:313](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L313)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.1

The server encountered an unexpected condition that prevented it from fulfilling the request.

***

### NOT\_IMPLEMENTED

> **NOT\_IMPLEMENTED**: `501`

Defined in: [http-status.ts:319](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L319)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.2

The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.

***

### BAD\_GATEWAY

> **BAD\_GATEWAY**: `502`

Defined in: [http-status.ts:325](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L325)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.3

This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.

***

### SERVICE\_UNAVAILABLE

> **SERVICE\_UNAVAILABLE**: `503`

Defined in: [http-status.ts:331](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L331)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.4

The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This responses should be used for temporary conditions and the Retry-After: HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.

***

### GATEWAY\_TIMEOUT

> **GATEWAY\_TIMEOUT**: `504`

Defined in: [http-status.ts:337](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L337)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.5

This error response is given when the server is acting as a gateway and cannot get a response in time.

***

### HTTP\_VERSION\_NOT\_SUPPORTED

> **HTTP\_VERSION\_NOT\_SUPPORTED**: `505`

Defined in: [http-status.ts:343](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L343)

Official Documentation @ https://tools.ietf.org/html/rfc7231#section-6.6.6

The HTTP version used in the request is not supported by the server.

***

### INSUFFICIENT\_STORAGE

> **INSUFFICIENT\_STORAGE**: `507`

Defined in: [http-status.ts:349](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L349)

Official Documentation @ https://tools.ietf.org/html/rfc2518#section-10.6

The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.

***

### NETWORK\_AUTHENTICATION\_REQUIRED

> **NETWORK\_AUTHENTICATION\_REQUIRED**: `511`

Defined in: [http-status.ts:355](https://github.com/victory-sokolov/utils/blob/6f616498135dd6156dc7d516c9403dfbcefc5dae/src/http-status.ts#L355)

Official Documentation @ https://tools.ietf.org/html/rfc6585#section-6

The 511 status code indicates that the client needs to authenticate to gain network access.
