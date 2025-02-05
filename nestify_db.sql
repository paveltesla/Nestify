--
-- PostgreSQL database dump
--

-- Dumped from database version 17rc1
-- Dumped by pg_dump version 17rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: menuitems; Type: TABLE; Schema: public; Owner: Cvetochek
--

CREATE TABLE public.menuitems (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.menuitems OWNER TO "Cvetochek";

--
-- Name: menuitems_id_seq; Type: SEQUENCE; Schema: public; Owner: Cvetochek
--

CREATE SEQUENCE public.menuitems_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menuitems_id_seq OWNER TO "Cvetochek";

--
-- Name: menuitems_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Cvetochek
--

ALTER SEQUENCE public.menuitems_id_seq OWNED BY public.menuitems.id;


--
-- Name: reservation; Type: TABLE; Schema: public; Owner: Cvetochek
--

CREATE TABLE public.reservation (
    id bigint NOT NULL,
    user_id bigint,
    table_id bigint,
    reservation_date date NOT NULL,
    party_size integer NOT NULL,
    status character varying(255) DEFAULT 'confirmed'::character varying,
    reservation_time time(6) without time zone NOT NULL
);


ALTER TABLE public.reservation OWNER TO "Cvetochek";

--
-- Name: reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: Cvetochek
--

CREATE SEQUENCE public.reservation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservation_id_seq OWNER TO "Cvetochek";

--
-- Name: reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Cvetochek
--

ALTER SEQUENCE public.reservation_id_seq OWNED BY public.reservation.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: pavel
--

CREATE TABLE public.roles (
    id bigint NOT NULL,
    role_name character varying(255)
);


ALTER TABLE public.roles OWNER TO pavel;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: pavel
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO pavel;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pavel
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: tables; Type: TABLE; Schema: public; Owner: Cvetochek
--

CREATE TABLE public.tables (
    id bigint NOT NULL,
    zone_id bigint,
    table_number integer NOT NULL,
    capacity integer NOT NULL
);


ALTER TABLE public.tables OWNER TO "Cvetochek";

--
-- Name: tables_id_seq; Type: SEQUENCE; Schema: public; Owner: Cvetochek
--

CREATE SEQUENCE public.tables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tables_id_seq OWNER TO "Cvetochek";

--
-- Name: tables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Cvetochek
--

ALTER SEQUENCE public.tables_id_seq OWNED BY public.tables.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: Cvetochek
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    createt_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at time(6) without time zone
);


ALTER TABLE public.users OWNER TO "Cvetochek";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: Cvetochek
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO "Cvetochek";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Cvetochek
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_role; Type: TABLE; Schema: public; Owner: pavel
--

CREATE TABLE public.users_role (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.users_role OWNER TO pavel;

--
-- Name: zones; Type: TABLE; Schema: public; Owner: Cvetochek
--

CREATE TABLE public.zones (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.zones OWNER TO "Cvetochek";

--
-- Name: zones_id_seq; Type: SEQUENCE; Schema: public; Owner: Cvetochek
--

CREATE SEQUENCE public.zones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.zones_id_seq OWNER TO "Cvetochek";

--
-- Name: zones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: Cvetochek
--

ALTER SEQUENCE public.zones_id_seq OWNED BY public.zones.id;


--
-- Name: menuitems id; Type: DEFAULT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.menuitems ALTER COLUMN id SET DEFAULT nextval('public.menuitems_id_seq'::regclass);


--
-- Name: reservation id; Type: DEFAULT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.reservation ALTER COLUMN id SET DEFAULT nextval('public.reservation_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: pavel
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: tables id; Type: DEFAULT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.tables ALTER COLUMN id SET DEFAULT nextval('public.tables_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: zones id; Type: DEFAULT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.zones ALTER COLUMN id SET DEFAULT nextval('public.zones_id_seq'::regclass);


--
-- Data for Name: menuitems; Type: TABLE DATA; Schema: public; Owner: Cvetochek
--

COPY public.menuitems (id, name, description, price) FROM stdin;
\.


--
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: Cvetochek
--

COPY public.reservation (id, user_id, table_id, reservation_date, party_size, status, reservation_time) FROM stdin;
1	1	22	2024-10-15	5	confirmed	13:41:00
2	1	7	2024-10-15	2	confirmed	13:41:00
3	1	18	2024-10-16	5	confirmed	19:00:00
4	23	17	2000-12-12	4	confirmed	23:00:00
5	23	1	2024-10-17	3	confirmed	21:00:00
6	1	1	2024-10-17	3	confirmed	16:02:00
7	1	2	2024-11-25	4	confirmed	14:54:00
8	24	15	2024-10-21	4	confirmed	20:00:00
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: pavel
--

COPY public.roles (id, role_name) FROM stdin;
1	ADMIN
2	USER
\.


--
-- Data for Name: tables; Type: TABLE DATA; Schema: public; Owner: Cvetochek
--

COPY public.tables (id, zone_id, table_number, capacity) FROM stdin;
1	1	1	4
2	1	2	4
3	1	3	4
4	1	4	4
5	1	5	4
6	1	6	4
7	2	7	2
8	2	8	2
9	2	9	2
10	2	10	2
11	2	11	4
12	2	12	4
13	2	13	4
14	2	14	4
15	2	15	4
16	2	16	4
17	3	17	6
18	3	18	6
19	3	19	6
20	3	20	6
21	4	21	6
22	4	22	6
23	4	23	6
24	4	24	6
25	4	25	4
26	4	26	4
27	4	27	4
28	4	28	4
29	4	29	2
30	4	30	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: Cvetochek
--

COPY public.users (id, username, email, password, createt_at, created_at) FROM stdin;
2	nicolas	sdfsdf@jug.sdf	1111	2024-10-03 07:06:12	10:10:04
11	david_lee	david.lee@example.com	1111	2024-10-03 10:32:42.311885	11:45:56
15	patrickM	patrick.m@example.com	1111	2024-10-03 10:32:42.311885	16:24:56
17	ethan.h	ethan.h@example.com	1111	2024-10-03 10:32:42.311885	14:45:09
12	lauraB	laura.b@example.com	1111	2024-10-03 10:32:42.311885	09:01:15
13	tommyB	tommy.b@example.com	1111	2024-10-03 10:32:42.311885	14:37:29
10	natalie.k	natalie.k@gmail.com	1111	2024-10-03 10:32:42.311885	08:18:22
16	lisa_m	lisa.m@example.com	1111	2024-10-03 10:32:42.311885	11:33:20
14	alexandra01	alexandra01@gmail.com	1111	2024-10-03 10:32:42.311885	10:50:43
8	sarahw	sarahw@gmail.com	1111	2024-10-03 10:32:42.311885	13:22:33
7	chrisJ	chris.j@example.com	1111	2024-10-03 10:32:42.311885	09:50:02
6	emily_smith	emily.smith@gmail.com	1111	2024-10-03 10:32:42.311885	14:24:18
9	robert87	robert87@example.com	1111	2024-10-03 10:32:42.311885	16:00:00
4	janedoe	janedoe@example.com	1111	2024-10-03 10:32:42.311885	12:45:34
5	michael92	michael92@gmail.com	1111	2024-10-03 10:32:42.311885	10:12:22
1	pavel	pavellukasenko80@gmail.com	1111	2024-10-03 07:06:14.864933	\N
3	johndoe	johndoe@example.com	1111	2024-10-03 10:32:42.311885	12:34:56
22	uliana	edefsfe@fgd.com	1111	2024-10-03 14:45:33.795835	\N
23	user	example@email.com	1111	2024-10-15 16:33:50.665151	\N
24	pla_	user@gmail.com	1111	2024-10-15 16:42:41.393094	\N
25	howow	ewkfjn@slnef.df	1111	2024-10-21 16:24:05.184892	\N
26	sdjfls	lknelsnd@wfl.slkf	1111	2024-10-21 16:26:11.538127	\N
27	dslfjsldj	sdkfjh@jg.fisj	1111	2024-10-21 16:36:57.508971	\N
28	dlffsdf	samemail@mail.com	1111	2024-10-25 05:49:34.227063	\N
21	papa	sdfsdfds@gmail.com	1111	2024-10-03 12:03:23.044457	\N
29	dkfjnscs	dlskfmvnlk@sjn.eckm	1111	2024-10-25 05:57:08.550054	\N
30	vbnm	cvbnm@dfdf	1111	2024-10-25 06:13:44.83729	\N
31	sdkncl	sidfhsd@nsnc.dcd	1111	2024-10-25 06:15:40.285405	\N
32	skdjfskn	cvbn@rgfd.lskd	1111	2024-10-25 06:23:14.605144	\N
33	wkeommwcwjk	sdjfbadc@sjdkfn.cknckjd	1111	2024-10-25 06:23:43.060135	\N
34	qwer	qwer@fjnn.fjdn	1111	2024-10-25 07:23:03.074988	\N
35	sdkjbs	jfskdnf@skdfjn.sfs	1111	2024-10-25 08:32:39.635978	\N
36	slkclv	kmvlmv@sldk.sd	1111	2024-10-25 08:33:28.565405	\N
37	sldkcm	sldfmldm@kfd.sld	1111	2024-10-25 09:15:54.767161	\N
38	scdlcm	lkdsmcs@dmc.dc	1111	2024-10-25 09:20:57.05496	\N
39	ocnsoc	csdcsef@fec.edm	1111	2024-10-25 09:23:08.309434	\N
40	scmscerokfnef	lkndsckj@sklmf.edkmn	1111	2024-10-25 09:23:45.580404	\N
41	elck	dlced@n.dk	1111	2024-10-25 09:24:20.230768	\N
42	ociepiwmpcmpowjef	dlkscoisniewo@ksmke.lekm	1111	2024-10-25 09:38:14.575924	\N
43	eocnowen	lskdcmlscspekm@lwke.eck	1111	2024-10-25 09:40:20.925143	\N
44	epfiw	lkewccklen@lkme.fe	1111	2024-10-25 09:41:12.896664	\N
\.


--
-- Data for Name: users_role; Type: TABLE DATA; Schema: public; Owner: pavel
--

COPY public.users_role (user_id, role_id) FROM stdin;
1	1
2	1
3	1
4	1
5	2
6	2
7	2
8	2
9	2
10	2
11	2
12	2
13	2
14	2
15	2
16	2
17	2
21	2
22	2
23	2
24	2
\.


--
-- Data for Name: zones; Type: TABLE DATA; Schema: public; Owner: Cvetochek
--

COPY public.zones (id, name) FROM stdin;
1	hall 1
2	hall 2
3	children's area
4	terrace
\.


--
-- Name: menuitems_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Cvetochek
--

SELECT pg_catalog.setval('public.menuitems_id_seq', 1, false);


--
-- Name: reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Cvetochek
--

SELECT pg_catalog.setval('public.reservation_id_seq', 8, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pavel
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: tables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Cvetochek
--

SELECT pg_catalog.setval('public.tables_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Cvetochek
--

SELECT pg_catalog.setval('public.users_id_seq', 44, true);


--
-- Name: zones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: Cvetochek
--

SELECT pg_catalog.setval('public.zones_id_seq', 4, true);


--
-- Name: menuitems menuitems_pkey; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.menuitems
    ADD CONSTRAINT menuitems_pkey PRIMARY KEY (id);


--
-- Name: reservation reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: pavel
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: tables tables_pkey; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_role users_role_pkey; Type: CONSTRAINT; Schema: public; Owner: pavel
--

ALTER TABLE ONLY public.users_role
    ADD CONSTRAINT users_role_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: zones zones_name_key; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_name_key UNIQUE (name);


--
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (id);


--
-- Name: reservation reservation_table_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.tables(id) ON DELETE CASCADE;


--
-- Name: reservation reservation_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT reservation_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tables tables_zone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Cvetochek
--

ALTER TABLE ONLY public.tables
    ADD CONSTRAINT tables_zone_id_fkey FOREIGN KEY (zone_id) REFERENCES public.zones(id) ON DELETE CASCADE;


--
-- Name: users_role users_role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pavel
--

ALTER TABLE ONLY public.users_role
    ADD CONSTRAINT users_role_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: users_role users_role_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: pavel
--

ALTER TABLE ONLY public.users_role
    ADD CONSTRAINT users_role_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

