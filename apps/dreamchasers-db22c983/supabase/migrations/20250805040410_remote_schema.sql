create sequence "public"."member_vote_vote_number_seq";

create table "public"."banned_operators" (
    "id" text not null,
    "since" timestamp without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."banned_operators" enable row level security;

create table "public"."member_vote" (
    "vote_number" bigint not null default nextval('member_vote_vote_number_seq'::regclass),
    "id" text,
    "since" timestamp without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."member_vote" enable row level security;

create table "public"."old_member_vote" (
    "vote_number" bigint not null default nextval('member_vote_vote_number_seq'::regclass),
    "id" text,
    "since" timestamp without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."old_member_vote" enable row level security;

create table "public"."operators_v2" (
    "charid" text not null,
    "name" text not null,
    "rarity" integer not null,
    "position" text not null,
    "profession" text not null,
    "archetype" text not null,
    "coste0" integer not null,
    "coste2" integer not null,
    "faction" text not null,
    "gender" text not null,
    "race" text not null,
    "infected" text not null
);


alter table "public"."operators_v2" enable row level security;

create table "public"."timer_state" (
    "id" text not null default 'main_timer'::text,
    "state" text not null,
    "remaining_time" integer not null default 60,
    "started_at" timestamp with time zone,
    "paused_at" timestamp with time zone,
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."timer_state" enable row level security;

alter sequence "public"."member_vote_vote_number_seq" owned by "public"."member_vote"."vote_number";

CREATE UNIQUE INDEX banned_operators_pkey ON public.banned_operators USING btree (id);

CREATE UNIQUE INDEX member_vote_pkey ON public.member_vote USING btree (vote_number);

CREATE UNIQUE INDEX old_member_vote_pkey ON public.old_member_vote USING btree (vote_number);

CREATE UNIQUE INDEX operators_v2_pkey ON public.operators_v2 USING btree (charid);

CREATE UNIQUE INDEX timer_state_pkey ON public.timer_state USING btree (id);

alter table "public"."banned_operators" add constraint "banned_operators_pkey" PRIMARY KEY using index "banned_operators_pkey";

alter table "public"."member_vote" add constraint "member_vote_pkey" PRIMARY KEY using index "member_vote_pkey";

alter table "public"."old_member_vote" add constraint "old_member_vote_pkey" PRIMARY KEY using index "old_member_vote_pkey";

alter table "public"."operators_v2" add constraint "operators_v2_pkey" PRIMARY KEY using index "operators_v2_pkey";

alter table "public"."timer_state" add constraint "timer_state_pkey" PRIMARY KEY using index "timer_state_pkey";

alter table "public"."banned_operators" add constraint "banned_operators_id_fkey" FOREIGN KEY (id) REFERENCES operators_v2(charid) ON DELETE CASCADE not valid;

alter table "public"."banned_operators" validate constraint "banned_operators_id_fkey";

alter table "public"."member_vote" add constraint "member_vote_id_fkey" FOREIGN KEY (id) REFERENCES operators_v2(charid) ON DELETE CASCADE not valid;

alter table "public"."member_vote" validate constraint "member_vote_id_fkey";

alter table "public"."old_member_vote" add constraint "old_member_vote_id_fkey" FOREIGN KEY (id) REFERENCES operators_v2(charid) ON DELETE CASCADE not valid;

alter table "public"."old_member_vote" validate constraint "old_member_vote_id_fkey";

alter table "public"."timer_state" add constraint "timer_state_state_check" CHECK ((state = ANY (ARRAY['stopped'::text, 'running'::text, 'paused'::text]))) not valid;

alter table "public"."timer_state" validate constraint "timer_state_state_check";

create policy "Enable read access for all users"
on "public"."banned_operators"
as permissive
for select
to public
using (true);


create policy "Enable write access for all users"
on "public"."member_vote"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "public"."operators_v2"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."timer_state"
as permissive
for select
to public
using (true);



