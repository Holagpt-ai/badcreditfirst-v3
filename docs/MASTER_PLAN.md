# BADCREDITFIRST 2.0 - MASTER BUILD PLAN
**Objective:** Build a high-trust, CJ-compliant financial comparison site.
**Current Status:** Phase 1 (Pre-Approval Build).
**Design Benchmark:** CompareCards.com (Institutional/Fintech).
1. TECH STACK (STRICT)
Framework: Next.js 14.2 (App Router) - STABLE only.

Database: Supabase (Tables: cards, education).

Icons: Lucide React (Generic icons only).

2. COMPLIANCE RULES (NON-NEGOTIABLE)
Site Mode: Controlled by NEXT_PUBLIC_SITE_MODE=pre_approval.

Affiliate Links:

IF pre_approval: Render "Check Availability (Launching Soon)" button (DISABLED/GRAY).

IF live: Render "Apply Now" button (GREEN) with external link.

Images: NO BANK LOGOS. Use CSS gradients (Silver/Gold/Blue) or generic icons (Lock/Gauge).

Copy Restrictions:

NO "Guaranteed Approval".

NO "Instant Approval".

NO "Partner" language (Use "Independent Information").

Mandatory Pages: Methodology, Advertiser Disclosure, Privacy, Terms, Contact (Real Address).

3. CORE OFFERS (PHASE 1)
Only these 3 offers are allowed in the database initially:

OpenSky® Secured Visa® (Label: "Best for No Credit Check")

First Progress Secured Mastercard® (Label: "Best for Credit Rebuilding")

Self Credit Builder (Label: "Best Alternative to a Credit Card")
