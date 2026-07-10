/*
  Sail Boston 2026 static Leaflet map.
  No build step. No framework. Data is local and editable.
*/

const EVENT_DATES = [
  "2026-07-11",
  "2026-07-12",
  "2026-07-13",
  "2026-07-14",
  "2026-07-15",
  "2026-07-16"
];

const EVENTS = [
  {
    id: "voyagers-nyc-boston",
    title: "Voyagers Club Sail250 NYC → Boston Expedition",
    startDate: "2026-07-07",
    endDate: "2026-07-11",
    time: "Multi-day",
    type: "Expedition / private travel",
    reservation: "Required",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3528,
    lng: -71.0409,
    notes: "Tracks tall ship movement toward Boston. Low practical value as a casual outing unless booking the full expedition.",
    sources: [
      { label: "Voyagers Club expedition", url: "https://voyagersclub.org/expeditions/nyc-boston" }
    ]
  },
  {
    id: "aggregator-long-wharf",
    title: "Sail Into History: Tall Ships Return",
    startDate: "2026-07-07",
    endDate: "2026-07-09",
    time: "Varies",
    type: "Aggregator / cruise lead",
    reservation: "Recommended — verify inventory",
    reservationClass: "recommended",
    address: "Long Wharf, Boston, MA 02110",
    lat: 42.3602,
    lng: -71.0501,
    notes: "Treat as a lead, not a source of truth. Use it to check whether pre-parade cruise inventory exists.",
    sources: [
      { label: "Macaroni KID listing", url: "https://nashua.macaronikid.com/events/6a06b9fc7c64ad906baefe8f/%EF%B8%8Fsail-into-history-tall-ships-return-for-sail-boston-2026-%28sail250%29" }
    ]
  },
  {
    id: "new-england-aquarium-sold-out",
    title: "New England Aquarium Sail Boston Viewing Events — Sold Out",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:30 AM–9:30 PM",
    type: "Sold-out viewing / fireworks events",
    reservation: "Sold out",
    reservationClass: "soldout",
    address: "New England Aquarium, 1 Central Wharf, Boston, MA 02110",
    lat: 42.3590,
    lng: -71.0490,
    notes: "Daily update for July 9: Aquarium parade viewing, premium parade viewing, fireworks evening, and premium fireworks access are all marked sold out. Do not use this as a backup unless resale/official status changes.",
    sources: [
      { label: "New England Aquarium Sail Boston events", url: "https://www.neaq.org/engage/events-and-programs/sail-boston-2026/" }
    ]
  },
  {
    id: "mayflower-status",
    title: "Mayflower II Away From Plymouth / Boston Travel Window",
    startDate: "2026-07-08",
    endDate: "2026-07-17",
    time: "Multi-day",
    type: "Ship-status lead",
    reservation: "No attendee reservation found",
    reservationClass: "free",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3538,
    lng: -71.0474,
    notes: "Not an event by itself, but relevant because Mayflower II is part of the harbor activity.",
    sources: [
      { label: "See Plymouth Mayflower II note", url: "https://seeplymouth.com/event/mayflower-ii-and-tall-ships-250th-sail-celebration-plymouth-cape-cod-canal/" }
    ]
  },
  {
    id: "opening-ceremony",
    title: "Sail Boston Opening Ceremony",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "11:00 AM",
    type: "Official ceremony",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Boston Harbor Hotel Rotunda, 70 Rowes Wharf, Boston, MA 02110",
    lat: 42.3564,
    lng: -71.0503,
    notes: "Official opening marker before the public Parade of Sail day. July 9 check: no verified cancellation or official schedule change found.",
    sources: [
      { label: "Meet Boston Sail Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "mayflower-welcome-sail",
    title: "Mayflower II Welcome Sail in Boston Harbor",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "10:30 AM–2:00 PM",
    type: "Premium ticketed sail",
    reservation: "Required — verify availability",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3552,
    lng: -71.0489,
    notes: "High-price, high-access option. Use only if the historical angle matters more than Southie nostalgia.",
    sources: [
      { label: "Plimoth Patuxet Sail Boston events", url: "https://plimoth.org/events/sail-boston" }
    ]
  },
  {
    id: "nahant-wharf-party",
    title: "Nahant Wharf Tall Ships Viewing Party",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "3:00–9:00 PM",
    type: "Community party / viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Nahant Wharf, Wharf Street, Nahant, MA 01908",
    lat: 42.4242,
    lng: -70.9149,
    notes: "Night-before community option with food, ice cream, photo ops, and live music while ships anchor off Nahant.",
    sources: [
      { label: "Town of Nahant event page", url: "https://nahant.org/sail-boston-tall-ships-2026/" }
    ]
  },
  {
    id: "liberty-fleet-sneak-peek",
    title: "Liberty Fleet Sneak Peek Sail",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "Varies",
    type: "Ticketed harbor sail",
    reservation: "Required",
    reservationClass: "required",
    address: "67 Long Wharf, Boston, MA 02110",
    lat: 42.3603,
    lng: -71.0497,
    notes: "Pre-Parade boat option to see ships at anchor before the Saturday crowds.",
    sources: [
      { label: "Liberty Fleet Boston250 sails", url: "https://libertyfleet.com/cruises/boston250/" }
    ]
  },
  {
    id: "cape-ann-anchorage-cruise",
    title: "Tall Ships Boston Cruise / Cape Ann Whale Watch Anchorage Excursion",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "Varies",
    type: "Ticketed cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Cape Ann Whale Watch, 415 Main Street, Gloucester, MA 01930",
    lat: 42.6111,
    lng: -70.6635,
    notes: "Listed as a July 10 excursion to see ships at anchor before the Parade of Sail.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "spars-under-stars",
    title: "Mayflower II Spars Under the Stars",
    startDate: "2026-07-10",
    endDate: "2026-07-10",
    time: "6:30–8:30 PM",
    type: "Premium evening event",
    reservation: "Required — verify availability",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3547,
    lng: -71.0459,
    notes: "Romantic but pricey. Good if you want candlelit maritime history instead of crowds.",
    sources: [
      { label: "Plimoth Patuxet Sail Boston events", url: "https://plimoth.org/events/sail-boston" }
    ]
  },
  {
    id: "castle-island-parade",
    title: "Parade of Sail — Castle Island Public Viewing",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Main official event / public viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Castle Island, 2010 Day Boulevard, Boston, MA 02127",
    lat: 42.3385,
    lng: -71.0124,
    notes: "Top nostalgia pick. Castle Island is an official public viewing area for the Parade of Sail. July 11 access is concrete: no Castle Island parking from July 10 at 10 PM to July 11 at 6 PM, Day Boulevard closed July 11 from 6 AM to 6 PM, and security checkpoints at the Castle Island Main Lot and Head Island Causeway from 7 AM to 5 PM.",
    sources: [
      { label: "Sail Boston Parade of Sail", url: "https://www.sailboston.com/parade-of-sail/" },
      { label: "Mass.gov Castle Island guidance", url: "https://www.mass.gov/info-details/sail-boston-2026-what-to-know-before-you-go-to-castle-island" },
      { label: "Sullivan's Castle Island Sail250 note", url: "https://www.sullivanscastleisland.com/sail-250/" }
    ]
  },
  {
    id: "sullivans-castle-island",
    title: "Sullivan's Castle Island Viewing Hub",
    startDate: "2026-07-11",
    endDate: "2026-07-16",
    time: "Restaurant hours vary",
    type: "Food / nostalgia stop",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Sullivan's Castle Island, 2080 William J Day Boulevard, Boston, MA 02127",
    lat: 42.3389,
    lng: -71.0105,
    notes: "Best low-friction add-on for Castle Island nostalgia: harbor, walk, old-school Southie feel, and food.",
    sources: [
      { label: "Sullivan's Castle Island Sail250", url: "https://www.sullivanscastleisland.com/sail-250/" }
    ]
  },
  {
    id: "parade-general-viewing",
    title: "Parade of Sail — Boston Harbor Viewing Zones",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Official public viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3535,
    lng: -71.0425,
    notes: "Alternate public viewing zones include Seaport, Downtown Waterfront, North End, Charlestown, and East Boston. July 9 check: no verified cancellation or official schedule change to the July 11 Parade of Sail found.",
    sources: [
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" },
      { label: "Meet Boston viewing guide", url: "https://www.meetboston.com/sail-boston-2026/boston-tall-ships/" }
    ]
  },
  {
    id: "massmutual-grandstands",
    title: "MassMutual Sail Boston Grandstands at Fish Pier",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Reserved seating",
    reservation: "Required",
    reservationClass: "required",
    address: "Boston Fish Pier, 212 Northern Avenue, Boston, MA 02210",
    lat: 42.3488,
    lng: -71.0392,
    notes: "Best official controlled-seating fallback if Castle Island is too crowded. As of the July 9 update, official Boston Fish Pier grandstand tickets are still listed for sale: General Admission $225 and Premium $375 before service fees; inventory can change.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "mayflower-parade-sail",
    title: "Parade of Sail Aboard Mayflower II",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "6:30 AM–1:00 PM",
    type: "Ultra-premium sail",
    reservation: "Required",
    reservationClass: "required",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3514,
    lng: -71.0484,
    notes: "Very high-access option. Not necessary if the real goal is Castle Island nostalgia.",
    sources: [
      { label: "Plimoth Patuxet Sail Boston events", url: "https://plimoth.org/events/sail-boston" }
    ]
  },
  {
    id: "city-cruises-parade",
    title: "Boston Harbor City Cruises Parade of Sail Cruise",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "6:30 AM boarding / 7:00 AM depart",
    type: "Ticketed cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Long Wharf, Boston, MA 02110",
    lat: 42.3600,
    lng: -71.0499,
    notes: "Paid controlled viewing from Long Wharf with narration and concessions/bar listed by Boston.com.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "charles-river-boat-company",
    title: "Charles River Boat Company Parade of Sail Cruise",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "7:00 AM–4:00 PM",
    type: "Ticketed cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Rowes Wharf, Boston, MA 02110",
    lat: 42.3569,
    lng: -71.0501,
    notes: "Premium boat-viewing option from Rowes Wharf.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "classic-harbor-line",
    title: "Classic Harbor Line Schooner Adirondack III Parade Sail",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "7:00 AM–4:00 PM",
    type: "Ticketed schooner sail",
    reservation: "Required",
    reservationClass: "required",
    address: "Rowes Wharf, Boston, MA 02110",
    lat: 42.3574,
    lng: -71.0495,
    notes: "Premium sailboat option with brunch/lunch/drinks listed by Boston.com.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "sail-when-if",
    title: "Sail When and If / Harvey Gamage Parade Excursion",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "7:30 AM–4:00 PM",
    type: "Ticketed schooner sail",
    reservation: "Required",
    reservationClass: "required",
    address: "Charlestown Marina, 1 Pier 8, Charlestown, MA 02129",
    lat: 42.3747,
    lng: -71.0534,
    notes: "Good maritime-history angle from Charlestown Marina.",
    sources: [
      { label: "Boston.com boat-viewing guide", url: "https://www.boston.com/things-to-do/events/2026/06/25/how-to-watch-the-parade-of-sail-by-boat/" }
    ]
  },
  {
    id: "spectacle-island-viewing",
    title: "Spectacle Island Parade Viewing",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00 AM–4:00 PM",
    type: "Island viewing / ferry",
    reservation: "Sold out / no day-of ticketing",
    reservationClass: "soldout",
    address: "Spectacle Island, Boston Harbor Islands, Boston, MA",
    lat: 42.3265,
    lng: -70.9841,
    notes: "Strong harbor-view location, but the island listing says sold out and no day-of ticketing.",
    sources: [
      { label: "Boston Harbor Islands listing", url: "https://www.bostonharborislands.org/event/sail-boston-2026-parade-of-sail-viewing-from-spectacle-island/" }
    ]
  },
  {
    id: "pier6-patio-party",
    title: "Pier 6 Tall Ship Parade Patio Party",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00 AM–2:30 PM",
    type: "Party / restaurant viewing",
    reservation: "Required",
    reservationClass: "required",
    address: "Pier 6, 1 8th Street, Charlestown, MA 02129",
    lat: 42.3729,
    lng: -71.0550,
    notes: "Charlestown waterfront party. Strong paid backup if Castle Island feels too chaotic.",
    sources: [
      { label: "Boston Chefs event listing", url: "https://www.bostonchefs.com/events/tall-ship-parade-patio-party/" }
    ]
  },
  {
    id: "tall-ship-boston-vip",
    title: "The Tall Ship Boston VIP Viewing Experience",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:30 AM–2:30 PM",
    type: "Party / East Boston waterfront",
    reservation: "Required",
    reservationClass: "required",
    address: "The Tall Ship Boston, 1 East Pier Drive, East Boston, MA 02128",
    lat: 42.3642,
    lng: -71.0352,
    notes: "21+ ticketed viewing with harbor views. Good controlled-access backup. As of the July 9 update, The Tall Ship Boston is advertising July 11 viewing-party options, including an aboard viewing party and a tent pig roast viewing party.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/tall-ship-boston-the-tall-ships-return-vip-viewing-experience-tickets-1993015315459" },
      { label: "Tall Ship Boston Facebook post", url: "https://www.facebook.com/TallShipBoston/posts/guess-were-not-the-only-tall-ship-in-the-harbor-next-weekend%EF%B8%8Fsail-boston-2026-is/1005702162217548/" }
    ]
  },
  {
    id: "hyatt-watch-party",
    title: "Hyatt Regency Boston Harbor Waterfront Watch Party",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–4:00 PM",
    type: "Hotel party / watch party",
    reservation: "Required",
    reservationClass: "required",
    address: "Hyatt Regency Boston Harbor, 101 Harborside Drive, Boston, MA 02128",
    lat: 42.3591,
    lng: -71.0267,
    notes: "Harbor-view watch party with family activities, food/drinks, and 21+ areas listed in event snippets.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/sail-boston-2026-waterfront-watch-party-at-hyatt-regency-boston-harbor-tickets-1992367499825" }
    ]
  },
  {
    id: "mastros-ocean-club",
    title: "Mastro's Ocean Club Boston Tall Ships Viewing Experience",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:00 AM–2:00 PM",
    type: "Restaurant event",
    reservation: "Required",
    reservationClass: "required",
    address: "Mastro's Ocean Club, 25 Fan Pier Boulevard, Boston, MA 02210",
    lat: 42.3537,
    lng: -71.0436,
    notes: "Food-forward Fan Pier viewing. Less nostalgic than Castle Island but useful for a polished fallback.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/mastros-ocean-club-boston-tall-ships-viewing-experience-tickets-1990524065062" }
    ]
  },
  {
    id: "uss-constitution-museum",
    title: "USS Constitution Museum / Charlestown Navy Yard Programming",
    startDate: "2026-07-11",
    endDate: "2026-07-16",
    time: "9:00 AM–6:00 PM",
    type: "Museum / historic site",
    reservation: "No reservation found / donation suggested",
    reservationClass: "free",
    address: "USS Constitution Museum, Building 22, Charlestown Navy Yard, Charlestown, MA 02129",
    lat: 42.3725,
    lng: -71.0566,
    notes: "Historic add-on near the Navy Yard. Access may involve security screening or first-come rules depending on ship areas.",
    sources: [
      { label: "USS Constitution Museum visit page", url: "https://ussconstitutionmuseum.org/plan-your-visit/" },
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "sail-boston-festival",
    title: "Sail Boston Festival",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "10:00 AM–10:00 PM",
    type: "Official festival / beer garden / concessions",
    reservation: "No registration required",
    reservationClass: "free",
    address: "302 Northern Avenue, Boston, MA 02210",
    lat: 42.3485,
    lng: -71.0391,
    notes: "Free official festival with entertainment, concessions, merchandise, beer garden, and Ferris wheel.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" },
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "blue-hill-observatory",
    title: "Tall Ships and Chocolate Chips at Blue Hill Observatory",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "10:00 AM–5:00 PM",
    type: "Distant viewing / family activity",
    reservation: "Recommended — verify sign-up",
    reservationClass: "recommended",
    address: "Blue Hill Observatory, 1904 Canton Avenue, Milton, MA 02186",
    lat: 42.2143,
    lng: -71.1136,
    notes: "Quirky elevated-view lead. Better as backup than the main nostalgia outing.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/tall-ships-and-chocolate-chips-tickets-1992586702466" }
    ]
  },
  {
    id: "public-boarding",
    title: "Public Boarding of Ships",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Jul 11: 5:00–10:00 PM · Jul 12–15: 10:00 AM–10:00 PM",
    type: "Official ship boarding",
    reservation: "No reservation found / captain's discretion",
    reservationClass: "free",
    address: "Dockside berths around Boston Harbor, Boston, MA",
    lat: 42.3539,
    lng: -71.0452,
    notes: "Free public boarding, but each captain controls access. Expect lines, security, and ship-specific rules.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" },
      { label: "Boston Tea Party Ships event page", url: "https://www.bostonteapartyship.com/events-calendar/sail-boston-2026" }
    ]
  },
  {
    id: "rooftop-revere",
    title: "Toast to the Tall Ships at Rooftop@Revere",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "4:00 PM onward",
    type: "Rooftop party / pop-up",
    reservation: "Recommended — likely registration",
    reservationClass: "recommended",
    address: "Rooftop@Revere, 200 Stuart Street, Boston, MA 02116",
    lat: 42.3505,
    lng: -71.0663,
    notes: "Better for drinks after the Parade than ship nostalgia. Verify registration before showing up.",
    sources: [
      { label: "Eventbrite listing", url: "https://www.eventbrite.com/e/toast-to-the-tall-ships-at-rooftoprevere-tickets-1993029003400" }
    ]
  },
  {
    id: "fireworks-cruise-dj",
    title: "Mass Bay Lines Tall Ships Fireworks Cruise with DJ",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00–10:00 PM",
    type: "Party cruise",
    reservation: "Required",
    reservationClass: "required",
    address: "Rowes Wharf, Boston, MA 02110",
    lat: 42.3563,
    lng: -71.0507,
    notes: "Ticketed fireworks cruise from Rowes Wharf. Useful night-cap if Fan Pier crowds are too much.",
    sources: [
      { label: "AllEvents listing", url: "https://allevents.in/boston/boston-250-tall-ships-fireworks-cruise-with-dj/100001992951851637" }
    ]
  },
  {
    id: "fan-pier-fireworks-july11",
    title: "Sail Boston Fireworks off Fan Pier",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "9:15 PM",
    type: "Official fireworks",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3534,
    lng: -71.0431,
    notes: "Official fireworks from a barge off Fan Pier. Cinematic finish if you can handle Seaport crowds.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" },
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "street-parade",
    title: "Crew & Cadet Street Parade",
    startDate: "2026-07-13",
    endDate: "2026-07-13",
    time: "12:00–2:00 PM",
    type: "Official street parade",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Leader Bank Pavilion, 290 Northern Avenue, Boston, MA 02210",
    lat: 42.3489,
    lng: -71.0368,
    notes: "Route runs from Leader Bank Pavilion toward Christopher Columbus Park. Good daytime add-on after the big weekend.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" },
      { label: "Boston Tea Party Ships event page", url: "https://www.bostonteapartyship.com/events-calendar/sail-boston-2026" }
    ]
  },
  {
    id: "fan-pier-fireworks-july15",
    title: "Second Sail Boston Fireworks off Fan Pier",
    startDate: "2026-07-15",
    endDate: "2026-07-15",
    time: "9:15 PM",
    type: "Official fireworks",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3527,
    lng: -71.0438,
    notes: "Second official fireworks night before departure day.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" },
      { label: "Boston Tea Party Ships event page", url: "https://www.bostonteapartyship.com/events-calendar/sail-boston-2026" }
    ]
  },
  {
    id: "castle-island-no-parking-advisory",
    title: "Castle Island / Day Boulevard Parking Advisory Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "All day / verify restrictions",
    type: "Road-closure / parking advisory lead",
    reservation: "Lead — verify before driving",
    reservationClass: "recommended",
    address: "William J. Day Boulevard at Castle Island, Boston, MA 02127",
    lat: 42.3382,
    lng: -71.0127,
    notes: "July 11 Castle Island access: no parking July 10 at 10 PM through July 11 at 6 PM; Day Boulevard closed to vehicles July 11 from 6 AM to 6 PM; security checkpoints at Castle Island Main Lot and Head Island Causeway from 7 AM to 5 PM. Do not plan on Castle Island or Pleasure Bay curb parking; use transit or arrive on foot after checking official updates.",
    sources: [
      { label: "Mass.gov Castle Island guidance", url: "https://www.mass.gov/info-details/sail-boston-2026-what-to-know-before-you-go-to-castle-island" },
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "south-boston-waterfront-garage-lead",
    title: "South Boston Waterfront Garage / Seaport Parking Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Arrive very early / verify rates",
    type: "Parking lead",
    reservation: "Recommended — reserve/verify",
    reservationClass: "recommended",
    address: "12 Drydock Avenue, Boston, MA 02210",
    lat: 42.3448,
    lng: -71.0346,
    notes: "according to locals for Fish Pier, Flynn Cruiseport, and Seaport festival access. Useful if you are willing to walk Harborwalk; published transient parking is commonly around $25 for 3–10 hours, but event pricing, sellouts, and garage access may change with security perimeters — reserve and verify before driving.",
    sources: [
      { label: "Boston Seaport parking information", url: "https://www.bostonseaport.xyz/transportation/parking/" },
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "bcec-lot-and-silver-line-lead",
    title: "BCEC / Silver Line Park-and-Walk Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "All day / verify event operations",
    type: "Parking + transit lead",
    reservation: "Lead — verify availability",
    reservationClass: "recommended",
    address: "Boston Convention and Exhibition Center, 415 Summer Street, Boston, MA 02210",
    lat: 42.3457,
    lng: -71.0466,
    notes: "according to locals: a practical Seaport staging point if official lots are open. BCEC self-parking is often listed around $25, but event rates/availability can change. Pair with Silver Line or a 15–25 minute walk to Fish Pier/Fan Pier; verify BCEC event parking, closures on Summer Street, and MBTA service alerts.",
    sources: [
      { label: "BCEC directions and parking", url: "https://www.signatureboston.com/bcec/getting-here" },
      { label: "MBTA Silver Line", url: "https://www.mbta.com/schedules/741/line" }
    ]
  },
  {
    id: "southie-transit-advisory",
    title: "South Boston Transit Strategy: Red Line + Walk/Bus Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Peak crowds / verify service alerts",
    type: "Navigation advisory lead",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Broadway Station, Dorchester Avenue, Boston, MA 02127",
    lat: 42.3426,
    lng: -71.0571,
    notes: "according to locals: skip hunting for beach parking. Use Red Line to Broadway or Andrew, then walk or connect by bus/rideshare before closures tighten. Verify bus detours and station crowd control day-of.",
    sources: [
      { label: "MBTA service alerts", url: "https://www.mbta.com/alerts" },
      { label: "MBTA Red Line", url: "https://www.mbta.com/schedules/Red/line" }
    ]
  },
  {
    id: "charlestown-navy-yard-dock-lead",
    title: "Charlestown Navy Yard / Pier 1 Dock Location Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Ship boarding hours / verify assigned berths",
    type: "Tall ship dock lead",
    reservation: "No reservation found / verify berth list",
    reservationClass: "free",
    address: "Charlestown Navy Yard, Boston, MA 02129",
    lat: 42.3734,
    lng: -71.0560,
    notes: "according to locals: strong historic-dock area near USS Constitution and Pier 6. Treat exact ship assignments as TBD until Sail Boston publishes final berth maps; expect screening and one-way pedestrian flows.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" },
      { label: "USS Constitution Museum visit page", url: "https://ussconstitutionmuseum.org/plan-your-visit/" }
    ]
  },
  {
    id: "east-boston-piers-dock-lead",
    title: "East Boston Piers / Tall Ship Boston Dock Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Ship boarding hours / verify access",
    type: "Tall ship dock lead",
    reservation: "Lead — verify public access",
    reservationClass: "recommended",
    address: "1 East Pier Drive, East Boston, MA 02128",
    lat: 42.3642,
    lng: -71.0352,
    notes: "according to locals: East Boston offers skyline views and possible dock activity near the Tall Ship Boston. Verify whether piers are ticketed, private, or public on the day you go; Blue Line plus walking usually beats driving.",
    sources: [
      { label: "Tall Ship Boston", url: "https://www.tallshipboston.com/" },
      { label: "MBTA Blue Line", url: "https://www.mbta.com/schedules/Blue/line" }
    ]
  },
  {
    id: "long-wharf-rowes-wharf-dock-lead",
    title: "Long Wharf / Rowes Wharf Dock Cluster Lead",
    startDate: "2026-07-10",
    endDate: "2026-07-15",
    time: "Varies / verify cruise and berth access",
    type: "Tall ship dock + cruise departure lead",
    reservation: "Lead — verify tickets/access",
    reservationClass: "recommended",
    address: "Long Wharf, Boston, MA 02110",
    lat: 42.3596,
    lng: -71.0499,
    notes: "according to locals: useful hub for ticketed cruises, Aquarium/Blue Line access, and waterfront walks. Exact tall-ship dock access may be restricted, so verify wharf security and cruise check-in location before committing.",
    sources: [
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" },
      { label: "MBTA Aquarium Station", url: "https://www.mbta.com/stops/place-aqucl" }
    ]
  },
  {
    id: "legal-harpoon-pavilion-harborwalk-lead",
    title: "Legal / Pavilion / Harpoon Harborwalk Viewing Corridor",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Daytime / expect heavy crowds",
    type: "Point of interest / viewing lead",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Leader Bank Pavilion, 290 Northern Avenue, Boston, MA 02210",
    lat: 42.3489,
    lng: -71.0368,
    notes: "Boston-local lead: if aiming for the Seaport, walk toward Legal Sea Foods, Leader Bank Pavilion, and Harpoon rather than stopping at the first waterfront edge. The Harborwalk/rock-wall areas may catch inbound ships that continue past Black Falcon/Flynn Cruiseport, but expect intense crowds and keep moving if sightlines are blocked.",
    sources: [
      { label: "Leader Bank Pavilion", url: "https://www.leaderbankpavilion.com/" },
      { label: "Harpoon Brewery Boston", url: "https://www.harpoonbrewery.com/boston-brewery/" },
      { label: "Boston Harborwalk", url: "https://www.bostonharborwalk.org/" }
    ]
  },
  {
    id: "fan-pier-harborwalk-poi",
    title: "Fan Pier / Harborwalk Photo Point",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Daytime and fireworks evenings",
    type: "Point of interest / viewing lead",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3534,
    lng: -71.0431,
    notes: "according to locals: easy Seaport photo stop near official fireworks and festival activity. It will likely be crowded; use as a walk-through viewpoint rather than a guaranteed place to sit.",
    sources: [
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" },
      { label: "Boston Harborwalk", url: "https://www.bostonharborwalk.org/" }
    ]
  },
  {
    id: "christopher-columbus-park-poi",
    title: "Christopher Columbus Park / North End Harborwalk Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Daytime / verify crowd controls",
    type: "Point of interest / viewing lead",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Christopher Columbus Waterfront Park, Boston, MA 02110",
    lat: 42.3617,
    lng: -71.0507,
    notes: "according to locals: good North End add-on for snacks, shade breaks, and harbor peeks. Exact sightlines depend on vessel positions and any crowd-control fencing.",
    sources: [
      { label: "Boston Parks — Christopher Columbus Park", url: "https://www.boston.gov/departments/parks-and-recreation/parks/christopher-columbus-waterfront-park" },
      { label: "Sail Boston events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "logan-hyatt-viewing-lead",
    title: "Logan / Hyatt Harborwalk Viewing Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Daytime / verify hotel and Massport rules",
    type: "Point of interest / navigation lead",
    reservation: "Lead — verify access",
    reservationClass: "recommended",
    address: "101 Harborside Drive, Boston, MA 02128",
    lat: 42.3591,
    lng: -71.0267,
    notes: "according to locals: East Boston/Logan side can offer broad harbor views when downtown piers are packed. Verify hotel access, short-term parking rules, airport traffic, and pedestrian routes before using it as a base.",
    sources: [
      { label: "Hyatt Regency Boston Harbor", url: "https://www.hyatt.com/hyatt-regency/en-US/bosha-hyatt-regency-boston-harbor" },
      { label: "Massport Logan transportation", url: "https://www.massport.com/logan-airport/getting-to-logan" }
    ]
  },
  {
    id: "greenway-north-end-satellite",
    title: "Greenway / North End Food Break Satellite Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Lunch–evening / verify programming",
    type: "Parallel / satellite activity lead",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Rose Kennedy Greenway, Boston, MA 02110",
    lat: 42.3602,
    lng: -71.0520,
    notes: "according to locals: a practical decompression route between Aquarium, North End, and downtown waterfront crowds. Treat any food trucks, markets, or performances as variable and verify the Greenway calendar close to your date.",
    sources: [
      { label: "Rose Kennedy Greenway calendar", url: "https://www.rosekennedygreenway.org/events/" },
      { label: "Meet Boston Sail Boston guide", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "ica-seaport-satellite",
    title: "ICA / Seaport Indoor-Cooldown Satellite Lead",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Museum hours vary / verify tickets",
    type: "Parallel / satellite activity lead",
    reservation: "Recommended — verify tickets",
    reservationClass: "recommended",
    address: "Institute of Contemporary Art, 25 Harbor Shore Drive, Boston, MA 02210",
    lat: 42.3528,
    lng: -71.0431,
    notes: "according to locals: nearby indoor break if Seaport heat or crowds get rough. Not a tall-ship event; check museum hours, timed tickets, and street closures before routing through the area.",
    sources: [
      { label: "ICA Boston visit page", url: "https://www.icaboston.org/visit/" },
      { label: "Boston Harborwalk", url: "https://www.bostonharborwalk.org/" }
    ]
  },
  {
    id: "traffic-command-center-advisory",
    title: "Official Traffic / Road Closure Checkpoint Lead",
    startDate: "2026-07-10",
    endDate: "2026-07-16",
    time: "Check before every trip",
    type: "Road-closure / navigation advisory lead",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Boston City Hall Plaza, Boston, MA 02201",
    lat: 42.3604,
    lng: -71.0579,
    notes: "according to locals: road closures can change faster than static maps. Before leaving, check City of Boston, Mass.gov, MBTA alerts, and Sail Boston updates; assume Seaport, North End, Charlestown, East Boston, and Castle Island routes may be managed independently.",
    sources: [
      { label: "City of Boston traffic advisories", url: "https://www.boston.gov/departments/transportation" },
      { label: "MBTA alerts", url: "https://www.mbta.com/alerts" },
      { label: "Sail Boston official site", url: "https://www.sailboston.com/" }
    ]
  },
  {
    id: "lynx-sailaway-sold-out-lead",
    title: "Schooner Lynx Sailaway Tickets — No Available Dates Found",
    startDate: "2026-07-11",
    endDate: "2026-07-15",
    time: "Sailaway schedule varies",
    type: "Sold-out sailaway lead",
    reservation: "Sold out / no available dates found",
    reservationClass: "soldout",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3521,
    lng: -71.0436,
    notes: "Daily update for July 9: the official sailaways ticket flow shows no dates with available tickets for Lynx. Recheck the official ticket page only if a sailaway is a must-have.",
    sources: [
      { label: "Sail Boston sailaways tickets", url: "https://www.ticketsignup.io/TicketEvent/SailBoston2026Sailaways" },
      { label: "Sail Boston participating ships", url: "https://www.sailboston.com/ships/" }
    ]
  },
  {
    id: "departure-day",
    title: "Tall Ships Departure Day",
    startDate: "2026-07-16",
    endDate: "2026-07-16",
    time: "Timing TBD",
    type: "Departure / harbor viewing",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3518,
    lng: -71.0400,
    notes: "Ships depart Boston Harbor. Exact public viewing timing should be checked before attending.",
    sources: [
      { label: "Sail Boston home page", url: "https://www.sailboston.com/" },
      { label: "Axios Boston event overview", url: "https://www.axios.com/local/boston/2026/06/29/boston-harbor-tall-ships-visitors" }
    ]
  }
];


const SAMPLE_SCHEDULES = [
  {
    id: "sample-schedule-july11",
    title: "Sample Schedule — Parade Day on a Budget",
    startDate: "2026-07-11",
    endDate: "2026-07-11",
    time: "8:00 AM–9:45 PM",
    type: "Sample itinerary / low-cost",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Castle Island, 2010 Day Boulevard, Boston, MA 02127",
    lat: 42.3383,
    lng: -71.0115,
    notes: "8:30 AM — Find a viewing spot along the seawall.\n9:00 AM — Parade of Sail begins.\n10:00–11:30 AM — Watch the tall ships pass Castle Island.\n11:30 AM — Walk the Harborwalk toward the Seaport.\n12:00 PM — Lunch in the Seaport.\n1:00–3:00 PM — Explore Fan Pier and the waterfront as ships dock.\n3:00 PM — Visit the Sail Boston Festival (302 Northern Ave.).\n5:00 PM — Public ship boarding (capacity permitting).\n6:30 PM — Dinner in the Seaport.\n8:30 PM — Find a fireworks viewing location near Fan Pier.\n9:15 PM — Fireworks over Boston Harbor.\n10:00 PM — Depart after crowds begin to disperse.",
    sources: [
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "sample-schedule-july12",
    title: "Sample Schedule — Ship Boarding and Harborwalk",
    startDate: "2026-07-12",
    endDate: "2026-07-12",
    time: "10:00 AM–6:00 PM",
    type: "Sample itinerary / low-cost",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "302 Northern Avenue, Boston, MA 02210",
    lat: 42.3485,
    lng: -71.0391,
    notes: "Start with public boarding near the Seaport piers, watch the Coast Guard demonstration from the waterfront if sightlines are open, use the free festival for concessions and restrooms, and finish with an easy Harborwalk loop.",
    sources: [
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "sample-schedule-july13",
    title: "Sample Schedule — Crew Parade and Afternoon Boarding",
    startDate: "2026-07-13",
    endDate: "2026-07-13",
    time: "11:30 AM–7:00 PM",
    type: "Sample itinerary / low-cost",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Leader Bank Pavilion, 290 Northern Avenue, Boston, MA 02210",
    lat: 42.3489,
    lng: -71.0368,
    notes: "Find a street-parade spot before noon, walk toward Christopher Columbus Park after the parade, bring a packed lunch or grab a simple snack, then board ships once lines settle later in the afternoon.",
    sources: [
      { label: "Meet Boston schedule", url: "https://www.meetboston.com/sail-boston-2026/" }
    ]
  },
  {
    id: "sample-schedule-july14",
    title: "Sample Schedule — Low-Key Navy Yard Day",
    startDate: "2026-07-14",
    endDate: "2026-07-14",
    time: "10:00 AM–5:30 PM",
    type: "Sample itinerary / low-cost",
    reservation: "No reservation found / donation suggested",
    reservationClass: "free",
    address: "USS Constitution Museum, Building 22, Charlestown Navy Yard, Charlestown, MA 02129",
    lat: 42.3725,
    lng: -71.0566,
    notes: "Use the Charlestown Navy Yard as a quieter base, visit the museum, check nearby ship-boarding lines, carry a refillable water bottle, and return by ferry or MBTA instead of driving.",
    sources: [
      { label: "USS Constitution Museum visit page", url: "https://ussconstitutionmuseum.org/plan-your-visit/" },
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "sample-schedule-july15",
    title: "Sample Schedule — Final Full Boarding Day and Fireworks",
    startDate: "2026-07-15",
    endDate: "2026-07-15",
    time: "10:00 AM–9:45 PM",
    type: "Sample itinerary / low-cost",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Fan Pier Park, Boston, MA 02210",
    lat: 42.3534,
    lng: -71.0431,
    notes: "Prioritize one or two must-see ships in the morning, take a midday break away from the waterfront, return for the festival, and claim a free Fan Pier-area fireworks spot before sunset.",
    sources: [
      { label: "Sail Boston official events", url: "https://www.sailboston.com/events/" }
    ]
  },
  {
    id: "sample-schedule-july16",
    title: "Sample Schedule — Departure Day Harbor Views",
    startDate: "2026-07-16",
    endDate: "2026-07-16",
    time: "Morning–afternoon",
    type: "Sample itinerary / low-cost",
    reservation: "No reservation found",
    reservationClass: "free",
    address: "Boston Harbor, Boston, MA",
    lat: 42.3518,
    lng: -71.0400,
    notes: "Check official channels for departure timing, use transit to reach a harbor viewpoint, keep plans flexible as ships leave in phases, and pack snacks so the day stays cheap and easy.",
    sources: [
      { label: "Sail Boston home page", url: "https://www.sailboston.com/" }
    ]
  }
];

EVENTS.push(...SAMPLE_SCHEDULES);

const BOSTON_HARBOR_CENTER = [42.3532, -71.0430];
const DEFAULT_ZOOM = 13;
const DATE_FILTER_ALL = "all";

const LEAFLET_CSS_URLS = [
  "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
];

const LEAFLET_JS_URLS = [
  "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

const TILE_PROVIDERS = [
  {
    name: "CARTO Voyager",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  },
  {
    name: "CARTO Positron",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
  },
  {
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: "abc",
    attribution: "&copy; OpenStreetMap contributors"
  }
];

const appShell = document.querySelector(".app-shell");
const dateFilter = document.querySelector("#date-filter");
const listTab = document.querySelector("#list-tab");
const mapTab = document.querySelector("#map-tab");
const listPanel = document.querySelector("#events-list-wrap");
const mapPanel = document.querySelector("#map-panel");
const tbody = document.querySelector("#events-tbody");
const listSummary = document.querySelector("#list-summary");
const sheet = document.querySelector("#event-sheet");
const sheetContent = document.querySelector("#sheet-content");
const sheetClose = document.querySelector("#sheet-close");
const mapHint = document.querySelector(".map-hint");

let map = null;
let markerLayer = null;
let activeEventId = null;
let activeMarker = null;
let currentTileLayer = null;
let currentTileProviderIndex = 0;
let currentTileErrorCount = 0;
let currentTileLoadCount = 0;
let repairTimer = null;
const markers = new Map();

function loadStylesheet(url) {
  return new Promise((resolve, reject) => {
    if ([...document.styleSheets].some((sheetItem) => sheetItem.href === url)) {
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed stylesheet: ${url}`));
    document.head.appendChild(link);
  });
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed script: ${url}`));
    document.head.appendChild(script);
  });
}

async function loadFirstWorking(urls, loader) {
  let lastError = null;
  for (const url of urls) {
    try {
      await loader(url);
      return url;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("No URL candidates supplied.");
}

async function ensureLeaflet() {
  if (window.L?.map) return;

  await Promise.all([
    loadFirstWorking(LEAFLET_CSS_URLS, loadStylesheet),
    loadFirstWorking(LEAFLET_JS_URLS, loadScript)
  ]);

  if (!window.L?.map) {
    throw new Error("Leaflet loaded but window.L.map is unavailable.");
  }
}

function setMapStatus(message) {
  if (!mapHint) return;

  mapHint.textContent = message;
  mapHint.hidden = !message;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  }).format(new Date(year, month - 1, day));
}

function dateRangeLabel(event) {
  if (event.startDate === event.endDate) return formatDate(event.startDate);
  return `${formatDate(event.startDate)}–${formatDate(event.endDate)}`;
}

function mapLink(address) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function eventIsInOfficialDateWindow(event) {
  return event.startDate <= EVENT_DATES.at(-1) && EVENT_DATES[0] <= event.endDate;
}

function eventMatchesDate(event, selectedDate) {
  if (!eventIsInOfficialDateWindow(event)) return false;
  if (selectedDate === DATE_FILTER_ALL) return true;
  return event.startDate <= selectedDate && selectedDate <= event.endDate;
}

function startMinutes(time) {
  if (!time || /multi|varies|tbd|hours/i.test(time)) return 24 * 60;
  const match = time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  if (!match) return 24 * 60;

  let hours = Number(match[1]);
  const minutes = Number(match[2] || 0);
  const meridian = match[3]?.toUpperCase();

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function currentEvents() {
  const selectedDate = dateFilter?.value || DATE_FILTER_ALL;
  return EVENTS
    .filter((event) => eventMatchesDate(event, selectedDate))
    .sort((a, b) => {
      const dateCompare = a.startDate.localeCompare(b.startDate);
      if (dateCompare !== 0) return dateCompare;
      const timeCompare = startMinutes(a.time) - startMinutes(b.time);
      if (timeCompare !== 0) return timeCompare;
      return a.title.localeCompare(b.title);
    });
}

function populateFilter() {
  if (!dateFilter) return;
  dateFilter.innerHTML = [
    `<option value="${DATE_FILTER_ALL}">All</option>`,
    ...EVENT_DATES.map((date) => `<option value="${date}">${formatDate(date)}</option>`)
  ].join("");
  dateFilter.value = DATE_FILTER_ALL;
}

function selectedDateIsAll() {
  return (dateFilter?.value || DATE_FILTER_ALL) === DATE_FILTER_ALL;
}

const MARKER_TYPES = {
  parking: {
    label: "Parking",
    icon: "🅿️",
    keywords: ["parking", "garage", "park-and-walk", "shuttle"]
  },
  boarding: {
    label: "Tall ship dock / boarding",
    icon: "⚓",
    keywords: ["boarding", "dock", "berth", "public boarding", "ship boarding", "navy yard"]
  },
  official: {
    label: "Official event",
    icon: "★",
    keywords: ["official", "ceremony", "festival", "street parade", "parade of sail"]
  },
  cruise: {
    label: "Ticketed cruise",
    icon: "⛵",
    keywords: ["ticketed", "cruise", "sail", "schooner", "expedition", "reserved seating", "premium"]
  },
  food: {
    label: "Food / drink",
    icon: "🍽️",
    keywords: ["food", "drink", "restaurant", "beer garden", "concessions", "rooftop", "toast"]
  },
  viewing: {
    label: "Viewing",
    icon: "👀",
    keywords: ["viewing", "watch party", "grandstands", "observatory"]
  },
  museum: {
    label: "Museum / historic",
    icon: "🏛️",
    keywords: ["museum", "historic", "uss constitution"]
  },
  advisory: {
    label: "Advisory / navigation",
    icon: "⚠️",
    keywords: ["advisory", "navigation", "status", "lead", "verify", "aggregator"]
  },
  fireworks: {
    label: "Fireworks / party",
    icon: "🎆",
    keywords: ["fireworks", "party", "dj", "vip", "pop-up"]
  },
  other: {
    label: "Other",
    icon: "•",
    keywords: []
  }
};

const MARKER_TYPE_PRIORITY = [
  "parking",
  "fireworks",
  "museum",
  "food",
  "advisory",
  "boarding",
  "cruise",
  "official",
  "viewing"
];

function markerTypeFor(event) {
  const typeText = String(event.type || "").toLowerCase();

  if (typeText.includes("sample itinerary")) return "other";
  if (typeText.includes("parking")) return "parking";
  if (typeText.includes("fireworks") || typeText.includes("party")) return "fireworks";
  if (typeText.includes("museum") || typeText.includes("historic")) return "museum";
  if (typeText.includes("food") || typeText.includes("restaurant") || typeText.includes("beer")) return "food";
  if (typeText.includes("advisory") || typeText.includes("navigation")) return "advisory";
  if (typeText.includes("dock") || typeText.includes("boarding")) return "boarding";
  if (typeText.includes("ticketed") || typeText.includes("cruise") || typeText.includes("sail") || typeText.includes("reserved") || typeText.includes("premium")) return "cruise";
  if (typeText.includes("official")) return "official";
  if (typeText.includes("viewing")) return "viewing";

  const searchable = `${event.title} ${event.reservation} ${event.address} ${event.notes}`.toLowerCase();
  const match = MARKER_TYPE_PRIORITY.find((type) => MARKER_TYPES[type].keywords.some((keyword) => searchable.includes(keyword)));
  return match || "other";
}

function markerTitle(event) {
  return `${event.title} — ${MARKER_TYPES[markerTypeFor(event)].label}`;
}

function createIcon(event, isActive = false) {
  const markerType = markerTypeFor(event);
  const markerInfo = MARKER_TYPES[markerType];
  const className = ["sail-marker", `sail-marker-${markerType}`, isActive ? "is-active" : ""].filter(Boolean).join(" ");
  return L.divIcon({
    className: "sail-marker-wrap",
    html: `<div class="${className}" aria-hidden="true"><span>${markerInfo.icon}</span></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 42]
  });
}

function resetMapToBostonHarbor() {
  if (!map) return;
  map.setView(BOSTON_HARBOR_CENTER, DEFAULT_ZOOM, { animate: false });
}

function fitVisibleEvents(events) {
  if (!map || !events.length) return;

  if (selectedDateIsAll()) {
    resetMapToBostonHarbor();
    return;
  }

  if (events.length === 1) {
    map.setView([events[0].lat, events[0].lng], Math.max(DEFAULT_ZOOM, 14), { animate: false });
    return;
  }

  const bounds = L.latLngBounds(events.map((event) => [event.lat, event.lng]));
  map.fitBounds(bounds.pad(0.18), { animate: false, maxZoom: 14 });
}

function renderMarkers() {
  if (!markerLayer || !map) return;

  markerLayer.clearLayers();
  markers.clear();

  const visible = currentEvents();
  visible.forEach((event) => {
    const marker = L.marker([event.lat, event.lng], {
      icon: createIcon(event, event.id === activeEventId),
      title: markerTitle(event),
      alt: markerTitle(event),
      keyboard: true,
      riseOnHover: true
    });

    marker.on("click", (leafletEvent) => {
      L.DomEvent.stopPropagation(leafletEvent);
      openEvent(event.id, { pan: true });
    });

    marker.on("keypress", (keyboardEvent) => {
      if (keyboardEvent.originalEvent.key === "Enter" || keyboardEvent.originalEvent.key === " ") {
        openEvent(event.id, { pan: true });
      }
    });

    marker.addTo(markerLayer);
    markers.set(event.id, marker);
  });

  fitVisibleEvents(visible);
  repairMapSoon("markers");
}

function renderList() {
  if (!tbody) return;

  const rows = currentEvents().map((event) => `
    <tr tabindex="0" data-event-id="${escapeHtml(event.id)}">
      <td>${escapeHtml(dateRangeLabel(event))}</td>
      <td>${escapeHtml(event.time)}</td>
      <td>
        <strong>${escapeHtml(event.title)}</strong>
        <span class="list-note">${escapeHtml(event.address)}</span>
      </td>
      <td>${escapeHtml(event.type)}</td>
      <td><span class="chip ${escapeHtml(event.reservationClass)}">${escapeHtml(event.reservation)}</span></td>
    </tr>
  `);

  tbody.innerHTML = rows.join("");
  const count = rows.length;
  const selectedDate = dateFilter?.value || DATE_FILTER_ALL;
  if (listSummary) {
    listSummary.textContent = selectedDate === DATE_FILTER_ALL
      ? `${count} known event${count === 1 ? "" : "s"} shown.`
      : `${count} event${count === 1 ? "" : "s"} on ${formatDate(selectedDate)}.`;
  }
}

function googleCalendarDate(dateString, fallbackTime = "09:00") {
  const [hour, minute] = fallbackTime.split(":").map(Number);
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day, hour, minute, 0);
}

function parseCalendarDates(event) {
  const firstTime = event.time.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/i);
  const secondTime = event.time.match(/[–-]\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  const fallbackStart = event.time.toLowerCase().includes("evening") ? "18:00" : "09:00";

  const convert = (match, fallback) => {
    if (!match) return fallback;
    let hours = Number(match[1]);
    const minutes = Number(match[2] || 0);
    const meridian = match[3]?.toUpperCase();
    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const startClock = convert(firstTime, fallbackStart);
  const endClock = convert(secondTime, null);
  const start = googleCalendarDate(event.startDate, startClock);
  let end;

  if (endClock) {
    end = googleCalendarDate(event.startDate, endClock);
    if (end <= start) end.setDate(end.getDate() + 1);
  } else if (event.startDate !== event.endDate && /multi|hours|varies|tbd/i.test(event.time)) {
    end = googleCalendarDate(event.endDate, "17:00");
  } else {
    end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  }

  return { start, end };
}

function icsDate(date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function escapeIcs(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll("\n", "\\n");
}

function buildIcs(event) {
  const { start, end } = parseCalendarDates(event);
  const sourceLines = event.sources.map((source) => `${source.label}: ${source.url}`).join("\n");
  const description = [
    event.notes,
    `Type: ${event.type}`,
    `Reservation: ${event.reservation}`,
    `Open Maps: ${mapLink(event.address)}`,
    sourceLines ? `Sources:\n${sourceLines}` : ""
  ].filter(Boolean).join("\n\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Droxey//Tall Ships Boston//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@tallships.droxey.com`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `LOCATION:${escapeIcs(event.address)}`,
    `GEO:${event.lat};${event.lng}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `URL:${mapLink(event.address)}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

function isMobileCalendarTarget() {
  const ua = window.navigator.userAgent;
  const isTouchMac = /Macintosh/i.test(ua) && window.navigator.maxTouchPoints > 1;
  return /Android|iPhone|iPad|iPod/i.test(ua) || isTouchMac;
}

function calendarBlobUrl(ics) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
}

function downloadCalendarFile(event, ics) {
  const url = calendarBlobUrl(ics);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.id}.ics`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function openCalendarFile(ics) {
  const url = calendarBlobUrl(ics);
  window.location.href = url;
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function addToCalendar(event) {
  const ics = buildIcs(event);

  if (isMobileCalendarTarget()) {
    openCalendarFile(ics);
    return;
  }

  downloadCalendarFile(event, ics);
}

function renderSheet(event) {
  const sources = event.sources.map((source) => `
    <li><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)}</a></li>
  `).join("");

  sheetContent.innerHTML = `
    <div class="sheet-inner">
      <div class="kicker">
        <span class="chip">${escapeHtml(event.type)}</span>
        <span class="chip ${escapeHtml(event.reservationClass)}">${escapeHtml(event.reservation)}</span>
      </div>
      <h2 class="sheet-title">${escapeHtml(event.title)}</h2>
      <div class="meta-grid">
        <div class="meta-card">
          <b>Date</b>
          <span>${escapeHtml(dateRangeLabel(event))}</span>
        </div>
        <div class="meta-card">
          <b>Time</b>
          <span>${escapeHtml(event.time)}</span>
        </div>
        <div class="meta-card address-card">
          <b>Address</b>
          <address>${escapeHtml(event.address)}</address>
        </div>
      </div>
      <p class="notes">${escapeHtml(event.notes)}</p>
      <div class="sheet-actions-separator" aria-hidden="true"></div>
      <div class="actions">
        <a class="button button-primary" href="${escapeHtml(mapLink(event.address))}" target="_blank" rel="noopener noreferrer">Open Maps</a>
        <button id="share-event" class="button button-ghost" type="button">Share</button>
        <button id="calendar-event" class="button button-ghost button-wide" type="button">Add to Calendar</button>
      </div>
      <ul class="source-list" aria-label="Event source links">
        ${sources}
      </ul>
    </div>
  `;

  document.querySelector("#share-event")?.addEventListener("click", () => shareEvent(event));
  document.querySelector("#calendar-event")?.addEventListener("click", () => addToCalendar(event));
}

async function shareEvent(event) {
  const shareUrl = mapLink(event.address);
  const text = `${event.title}\n${dateRangeLabel(event)} · ${event.time}\n${event.address}\nReservation: ${event.reservation}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: event.title, text, url: shareUrl });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  try {
    await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
    temporarySheetNotice("Copied event details.");
  } catch {
    temporarySheetNotice("Share unavailable. Open Maps and copy the link from there.");
  }
}

function temporarySheetNotice(message) {
  const notice = document.createElement("p");
  notice.className = "notes";
  notice.setAttribute("role", "status");
  notice.textContent = message;
  sheetContent.querySelector(".sheet-inner")?.appendChild(notice);
  window.setTimeout(() => notice.remove(), 2200);
}

function openEvent(eventId, options = {}) {
  const event = EVENTS.find((item) => item.id === eventId);
  if (!event) return;

  if (activeMarker) {
    const previousEvent = EVENTS.find((item) => item.id === activeEventId);
    if (previousEvent) activeMarker.setIcon(createIcon(previousEvent, false));
  }

  activeEventId = event.id;
  activeMarker = markers.get(event.id) || null;
  if (activeMarker) activeMarker.setIcon(createIcon(event, true));

  renderSheet(event);
  sheet.classList.add("is-open");

  if (options.pan && appShell?.dataset.view === "map" && map) {
    map.panTo([event.lat, event.lng], { animate: true, duration: 0.22 });
    repairMapSoon("open-event");
  }
}

function closeSheet() {
  if (activeMarker) {
    const previousEvent = EVENTS.find((item) => item.id === activeEventId);
    if (previousEvent) activeMarker.setIcon(createIcon(previousEvent, false));
  }

  activeEventId = null;
  activeMarker = null;
  sheet.classList.remove("is-open");
}

function setActiveTab(view) {
  const isList = view === "list";
  listTab?.setAttribute("aria-selected", String(isList));
  mapTab?.setAttribute("aria-selected", String(!isList));
}

function setView(view) {
  const isList = view === "list";
  if (appShell) appShell.dataset.view = isList ? "list" : "map";
  if (listPanel) listPanel.hidden = !isList;
  if (mapPanel) mapPanel.hidden = isList;
  setActiveTab(isList ? "list" : "map");

  if (!isList) {
    repairMapNow("set-view-map");
    repairMapSoon("set-view-map");
  }
}

function refresh() {
  closeSheet();
  renderMarkers();
  renderList();
  if (appShell?.dataset.view === "map") repairMapSoon("refresh");
}

function installTileLayer(index = 0) {
  if (!map) return;
  currentTileProviderIndex = Math.min(index, TILE_PROVIDERS.length - 1);
  currentTileErrorCount = 0;
  currentTileLoadCount = 0;

  if (currentTileLayer) {
    map.removeLayer(currentTileLayer);
    currentTileLayer = null;
  }

  const provider = TILE_PROVIDERS[currentTileProviderIndex];
  currentTileLayer = L.tileLayer(provider.url, {
    attribution: provider.attribution,
    subdomains: provider.subdomains,
    maxZoom: 20,
    detectRetina: true,
    crossOrigin: true,
    updateWhenIdle: false,
    updateWhenZooming: false,
    keepBuffer: 4,
    errorTileUrl: errorTileDataUrl(provider.name)
  });

  currentTileLayer.on("tileload", () => {
    currentTileLoadCount += 1;
    // TODO(map-status): Debug a less distracting onboarding hint before restoring the normal bottom map message.
    if (currentTileLoadCount === 1) setMapStatus("");
  });

  currentTileLayer.on("tileerror", () => {
    currentTileErrorCount += 1;
    if (currentTileErrorCount >= 3 && currentTileProviderIndex < TILE_PROVIDERS.length - 1) {
      installTileLayer(currentTileProviderIndex + 1);
      repairMapSoon("tile-provider-fallback");
    } else if (currentTileProviderIndex === TILE_PROVIDERS.length - 1) {
      setMapStatus("Map tiles are unavailable. Event markers still work.");
    }
  });

  currentTileLayer.addTo(map);
  currentTileLayer.bringToBack();
  setMapStatus(`Loading map tiles: ${provider.name}`);
}

function errorTileDataUrl(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <rect width="256" height="256" fill="#dbe9ed"/>
      <path d="M0 210 C48 188 78 222 128 200 S208 188 256 212" fill="none" stroke="#aac7cf" stroke-width="12" opacity="0.85"/>
      <text x="128" y="124" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#0b2f3a">${escapeHtml(label)}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function repairMapNow(reason = "repair") {
  if (!map || appShell?.dataset.view === "list") return;
  const mapElement = document.querySelector("#map");
  if (!mapElement || mapElement.offsetWidth === 0 || mapElement.offsetHeight === 0) return;

  map.invalidateSize({ animate: false, pan: false });

  if (selectedDateIsAll()) {
    const center = map.getCenter();
    const drift = Math.abs(center.lat - BOSTON_HARBOR_CENTER[0]) + Math.abs(center.lng - BOSTON_HARBOR_CENTER[1]);
    if (drift > 0.12 || map.getZoom() < 10) resetMapToBostonHarbor();
  }
}

function repairMapSoon(reason = "repair") {
  window.clearTimeout(repairTimer);
  window.requestAnimationFrame(() => repairMapNow(reason));
  repairTimer = window.setTimeout(() => repairMapNow(`${reason}-late`), 140);
  window.setTimeout(() => repairMapNow(`${reason}-later`), 420);
  window.setTimeout(() => repairMapNow(`${reason}-final`), 900);
}

function initMap() {
  map = L.map("map", {
    center: BOSTON_HARBOR_CENTER,
    zoom: DEFAULT_ZOOM,
    minZoom: 10,
    maxZoom: 20,
    zoomControl: false,
    tap: true,
    preferCanvas: true,
    scrollWheelZoom: true,
    worldCopyJump: false
  });

  L.control.zoom({ position: "bottomright" }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  installTileLayer(0);

  map.on("click", closeSheet);
  map.on("touchstart", closeSheet);
  map.whenReady(() => repairMapSoon("map-ready"));
}

function initEvents() {
  dateFilter?.addEventListener("change", refresh);
  listTab?.addEventListener("click", () => setView("list"));
  mapTab?.addEventListener("click", () => setView("map"));
  sheetClose?.addEventListener("click", closeSheet);

  sheet?.addEventListener("click", (event) => event.stopPropagation());
  sheet?.addEventListener("touchstart", (event) => event.stopPropagation(), { passive: true });

  tbody?.addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-event-id]");
    if (!row) return;
    openEvent(row.dataset.eventId);
  });

  tbody?.addEventListener("keydown", (event) => {
    const row = event.target.closest("tr[data-event-id]");
    if (!row) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEvent(row.dataset.eventId);
    }
  });

  window.addEventListener("resize", () => repairMapSoon("resize"), { passive: true });
  window.addEventListener("orientationchange", () => repairMapSoon("orientation"), { passive: true });
  window.addEventListener("pageshow", () => repairMapSoon("pageshow"), { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => repairMapSoon("visual-viewport-resize"), { passive: true });
    window.visualViewport.addEventListener("scroll", () => repairMapSoon("visual-viewport-scroll"), { passive: true });
  }

  const mapElement = document.querySelector("#map");
  if (window.ResizeObserver && mapElement) {
    new ResizeObserver(() => repairMapSoon("resize-observer")).observe(mapElement);
  }
}

async function boot() {
  try {
    setView("map");
    populateFilter();
    await ensureLeaflet();
    initMap();
    renderMarkers();
    renderList();
    initEvents();
    resetMapToBostonHarbor();
    repairMapSoon("boot");
  } catch (error) {
    console.error(error);
    setMapStatus("Map failed to load. Use the List tab for event details.");
    renderList();
  }
}

boot();
