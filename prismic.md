# Zenika's prismic

Zenika's data are managed by prismic headless CMS.
This document register and describe all types of data stored in the CMS.

## Data structures

### Global
*website*: Every corporate website !
*Languages*: French, English

- *person*: Employee list. Only those who accepted to be on our website. (ex: picture of employees on corporate website
- *poles*: Poles list (ex: AYA, IKI, ...)
- *agency*: Agency list (ex: Paris, Lyon, Montreal, ...)
- *event*: Event list (ex: Redis Enterprise Developer Workshop displayed in the corporate website agenda)
- *client*: List of AYA's client (ex: list of clients on corporate website)
- *press*: List of press release

- *files*: **NOT USED**
- *splash*: **NOT USED**

### Corporate website

*website*: [https://zenika.com](https://zenika.com).
*Languages*: French, English

 - *corp-common*: common informations (ex: menu, legal, cookie consent text, ...)
 - *corp-events*: events page text
 - *corp-evolution*: evolution page text
 - *corp-home*: home page text
 - *corp-legal*: legal page text
 - *corp-zenbox*: list of zenbox


## Site Jobs (not released yet)

*website*: [https://jobs.zenika.com](https://jobs.zenika.com).
*Languages*: French, English

 - *jobs-homepage*: homepage jobs informations

### Academy (not released yet)

*website*: [https://academy.zenika.com](https://academy.zenika.com).
*Languages*: French only

 - *academy-common*: common informations (ex: menu, legal, cookie consent text, ...)
 - *academy-home*: homepage academy informations

## AYA

*website*: [https://aya-experience.com](https://aya-experience.com).
*Languages*: French only

- *ayaMembers*: List of AYA employees
- *references*: List of AYA's project reference
- *skills*: List of AYA's skills


## TODO

We have to improve our data structures. Here is the working need to be done :

- `files` is not used, should I suppress it ?
- `splash` is not used, should suppress it ?

- remove `ayaMembers` type, use `person` instead with a filter on aya agency
- rename `references` into `aya-references`
- rename `skills` into `aya-skills`

- rename `academy-home` into `academy-home-page`

- rename `jobs-homepage` into  `jobs-home-page`

- rename `corp-events` into `corp-events-page`
- rename `corp-evolution` into `corp-evolution-page`
- rename `corp-home` into `corp-home-page`
- rename `corp-legal` into `corp-legal-page`
- rename `corp-zenbox` into `corp-zenboxes`

- rename `person` into `employees`
- rename `agency` into `agencies`
- rename `event` into `events`
- rename `client` into `clients`
- rename `press` into `press-releases`

## Best practices

### Prefix

As there is only one repository for a certain amount of website, some common rules should be followed.

First rule is to prefix website specific data with the name of the project and a dash.

For jobs website you *shouldn't* name offers: `offers`.
For jobs website you *should* name offers: `jobs-offers`.

Data shared with multiple website has no prefix.

### Suffix

All list elements should be named in plural form.

A type specific to a page should be prefixed with page. Example:

- For jobs event page, you *shouldn't* name it: `jobs-zlife`
- For jobs event page, you *should* name it: `jobs-zlife-page`

The purpose is to not dissociate event page data (`jobs-events-page`) with the list of event (`jobs-events`).

### common

**TODO** Matthieu, I let you fill this part :)

## Contact

Before adding custom type into the prismic, please ask before to one of these person:

- Matthieu Lux
- Florent Berthelot
- Pierre Raby
- DSI
