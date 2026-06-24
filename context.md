# dCloud Prototype — Project Context



## Use Case
This is a prototype to demonstrate a new approach to serving demos to sellers that is fully aligned to the Cisco sellers GTM strategy. 


## The brief

dCloud is Cisco’s Sales Demonstration Platform.  It exists to service demos to Cisco Sellers, Partner Sellers and customers.  Demos drive sales by showing the full value proposition of the Cisco portfolio to customers.   dCloud provides fully integrated, ready-to-use environments designed to demo.  It also provides labs for enablement activity such as POVs, roadshows, test drives and hands-on days for customers and partners.  

Reimagine the Cisco **dCloud** demo catalog as a modern web interface — a **complete step-change in functionality and features**, not a reskin.

**Problems with today's dCloud**
- Too many demos, and critically they are not connected to one another.
- Search is generally poor and returns a large list of unconnected demo content with no defined user journey and no indication of which GTM solution they support
- The experience is hard to navigate; the current layout is dense, text-heavy and, critically, unconnected.
- Raw search is a poor user experience as the user is presented with a set of demos with no easy way to understand how they differ and which current GTM solutions they support
- There is no defined journey for any demos - do the demo and then what ?

**What we're building instead**
- Content organised around GTM Solutions rather than one flat list.
- Each Solution leads with a flagship demo (or demos) and links the deeper-dive demos
  around it, so related content is genuinely connected.
- Less deep-dive demos (Guided demos) are also connected so sellers can introduce the solution to a customer or take advantage of a five minute slot to deliver a quick click-thru demo.  Guided Demos are click-thru demos.
- Every demo is either a Solution Demo for a GTM solution, a deep-dive or a guided demo.  
- Solution Demos have no connective tissue - deep-dives are connected to one or more Solution Demos and same with Guided Demos
- Nothing outside Solution Demos are standalone - everything is connected upstream
- Solution Demos connect upstream to GTM motions (Secure AI Factory, Future Proof Workplaces and Digital Resilience (these tend to change so they should be flexible in the code)
- There are few solution demos so the upstream links can be manual
- Trying to make all of this automatic based on tagging or something is likely fraught with complexity, so manual for now - we need a user interface (Admin) to connect demos and build Solution Zones
- The connectivity between demos should be clear and obvious - when a user enters a ‘Solution’ the deep-dives and guided demos should be easy to see.
- **Fast discovery** — a simulated AI search plus a ⌘K fuzzy palette.
- A **personalised, recognised** experience that remembers what the user did - history is per-user and obvious
- A scoring system on login - heres how many demos you did, when you did them, customer linkage, some kind of scoring system and ranking - high ranks should be very difficult to achieve
- A **highly visual** way to advertise the newest content.


## Tooling
React / Vite/ Typescript
File based test data 
No backend 
everything persists in localStorage.


## Hierarchy

Top level Hierarchy is the Cisco GTM Motions as follows
- AI Ready Data Centres
- Future Proof Workplaces
- Digital Resilience 

The admin screen should allow GTM Motions to be added or edited 

Next are Solution Zones which can be connected to one or more GTM Motions.  Solution Zones are as follows:
- Secure Networking 
- Secure AI Factory
- Workplace Experiences
- Digital Resilience Assurance
- Agentic Security Architecture 
- Unified Forwarding Architecture
- Cost Effective Network Stack 

The admin screen should allow GTM Motions to be added or edited 


Next are demos & Labs
- Solution Demos (broad, not deep, covers a lot of ground)
- Deep-Dive Demos (Deep, not broad - covers some topics from the Solution Demo)
- Guided Demos (Click-Thru demos - solution intros, product intros, quick run-thru)
- Labs (Hands-On experience)

Demos are connected to one or more Solution Zones
Ideally demos should never be orphaned.   Orphaned demos should be flagged in the admin screen.


### A Solution Zone
- This is a critical new idea
- When the user enters the Solution Zone, it should have a unique look for each one.   Background etc. should be different for each one.  The backgrounds should look very high-tech and be different for each solution. 
- Solution Zones are the place that bring all the components for a particular GTM solution into one place.   Super simple, fully connected user experience with everything the seller needs in one place. 

A Solution zone is a UI that bring together a set of connected demos, videos and documentation to provide a highly-focussed experience for a user searching for a demo.  The zone is defined by the Solution demo, a number of connected deep-dive demos, labs, Guided Demos, videos and documentation that provide a complete set of assets for the seller to dive deep with the customers on the solution - start with a guided demo, jump to the demo simulation and Solution demos, deep-dive into particular areas of interest and wrap up with a POV, Lab or CPOC.  

Search
Raw search is a second-class citizen - users should be able to navigate to the solution zone they want quickly and easily and from there the choices are limited and accessible

User Journey
Each Solution Zone should have a user-journey - would love an AI Generated video or GIF or something to show the journey 
Journey is the journey the seller will take the buyer on from a demo perspective


## User Personas
Cisco Sellers - typically SEs and Account Managers.  Technical demos for SEs and less technical for AEs.
Partner Sellers - typically SEs and Account Managers working for cisco partners 
Customers - customers like to try things out.  They should have an amazing experience doing so - what value add can we add here ?


## Layout / UX
**Modern, dark, spacious.** Visual north-star is **Cisco Cloud Control** (dark, centred 
  "Hi, &lt;Name&gt;", gradient glow, pill chips, colourful viz on dark). The **current dCloud
   layout is the anti-pattern** — diverge from its dense card-list / accordion-sidebar /
   text-dump detail pages.

Keep the page layouts clean, do NOT clutter pages with many different things.


### Landing Pages

Logged our Landing only.** A friendly, SEO-optimised public page (the only crawlable  page — everything else is behind sign-in): animated spiral logo, welcome, "Log in with Cisco"  (simulated SSO).  Space things out on the page so everything is not clumped up together. 

Logged in -> Latest content, quick access to zones, favourites, history, scheduled content - all easily accessible 


## Favourites
In top Nav, just a gold star that opens a page of the users favourite demos or Solution Zones


## Top bar 
- Persistent when logged in
- **Logo + dCloud** (home).
- Primary nav: **Home · Solutions ▾ · Favourites · History**. "Solutions" is a dropdown listing
  all reference designs so any Solution is reachable from anywhere.
- **Search icon** → opens the ⌘K command palette (global fuzzy search).
- **Avatar** → Profile (name + role shown).



## Raw Search 
- Raw search is a second class citizen for surfacing content 
- Navigation to a Solution Zone is the preferred option - everything you need should be there 
- Raw search can & should surface content BUT always in the context of the GTM / Solution Hierarchy 
- Search bar should be in the top nav and not front and centre as is popular with AI Chatbots today


## User Profiles 
Show the user profile top right - show their status, name, avatar, everything else is on a user profile page
User profile page should somehow link to SalesForce


## User Status Hierarchy
Users get points for running demos, points for adding customer outcomes, points for labs etc.  They progress through these statuses.

**Explorer**
*Starting point — discovering demos and building activity*
**Practitioner**
*Regularly running demos and using the platform effectively*
**Contributor**
*Adding outcomes, feedback, and improving the demo ecosystem*
**Specialist**
*Demonstrating depth in specific technologies or solutions*
**Expert**
*Consistently delivering high-quality customer engagements*
**Advisor**
*Using demos strategically to influence customer decisions*
**Strategist**
*Connecting demos to business outcomes and sales motions*
**Leader**
*Driving adoption and enabling others*
**Master**
*Recognised for exceptional demo capability and impact*
**Visionary**
*Top-tier users shaping the future of customer experiences*

## Tagging

Tagging is critical to the operational model of the platform 

Tags should be multi-faceted 
Tags should be categorised
UI should have a box for each type of supported tag 
Types are as follows:
Demo Type : Solution, Deep-Dive, Guided, Lab
Demo Operational Type : Scheduled, Instant, Guided
BE - CAI, Service Provider, Collaboration, Cisco Compute, IOT, Security, Splunk, Enterprise Networking, Enterprise Switching, Wireless, Network Assurance, AI


