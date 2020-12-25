toc.dat                                                                                             0000600 0004000 0002000 00000021066 13771401621 0014446 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       3                    x            nepeype    12.4    12.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16385    nepeype    DATABASE     y   CREATE DATABASE nepeype WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE nepeype;
             	   victordbu    false         �            1259    16433    bregando    TABLE     w   CREATE TABLE public.bregando (
    dueno_id integer NOT NULL,
    nepe_id integer NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.bregando;
       public         heap 	   victordbu    false         �            1259    16436    bregando_bregando_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bregando_bregando_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.bregando_bregando_id_seq;
       public       	   victordbu    false    202         �           0    0    bregando_bregando_id_seq    SEQUENCE OWNED BY     L   ALTER SEQUENCE public.bregando_bregando_id_seq OWNED BY public.bregando.id;
          public       	   victordbu    false    203         �            1259    16438    dueno    TABLE     �  CREATE TABLE public.dueno (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(64) NOT NULL,
    last_log date DEFAULT '2010-01-01'::date NOT NULL,
    first_log date DEFAULT '2010-01-01'::date NOT NULL,
    CONSTRAINT dueno_first_log_check CHECK ((first_log > '2009-12-31'::date)),
    CONSTRAINT dueno_last_log_check CHECK ((last_log > '2009-12-31'::date))
);
    DROP TABLE public.dueno;
       public         heap 	   victordbu    false         �            1259    16445    dueno_dueno_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dueno_dueno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dueno_dueno_id_seq;
       public       	   victordbu    false    204         �           0    0    dueno_dueno_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.dueno_dueno_id_seq OWNED BY public.dueno.id;
          public       	   victordbu    false    205         �            1259    16447    nepe    TABLE     R  CREATE TABLE public.nepe (
    id integer NOT NULL,
    nombre character varying(64) NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    media_video_url character varying(128) NOT NULL,
    media_social_handle json NOT NULL,
    media_foto_url character varying(64)[] NOT NULL,
    que character varying(64)[] NOT NULL,
    donde character varying(64)[] NOT NULL,
    a_tu_casa boolean NOT NULL,
    nombre_que_vector tsvector NOT NULL,
    donde_vector tsvector NOT NULL,
    cuando json NOT NULL,
    CONSTRAINT nepe_revisado_check CHECK ((revisado > '2009-12-31'::date))
);
    DROP TABLE public.nepe;
       public         heap 	   victordbu    false         �            1259    16455    nepe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.nepe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.nepe_id_seq;
       public       	   victordbu    false    206         �           0    0    nepe_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;
          public       	   victordbu    false    207                    2604    16457    bregando id    DEFAULT     s   ALTER TABLE ONLY public.bregando ALTER COLUMN id SET DEFAULT nextval('public.bregando_bregando_id_seq'::regclass);
 :   ALTER TABLE public.bregando ALTER COLUMN id DROP DEFAULT;
       public       	   victordbu    false    203    202                    2604    16458    dueno id    DEFAULT     j   ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_dueno_id_seq'::regclass);
 7   ALTER TABLE public.dueno ALTER COLUMN id DROP DEFAULT;
       public       	   victordbu    false    205    204                    2604    16459    nepe id    DEFAULT     b   ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);
 6   ALTER TABLE public.nepe ALTER COLUMN id DROP DEFAULT;
       public       	   victordbu    false    207    206         �          0    16433    bregando 
   TABLE DATA           9   COPY public.bregando (dueno_id, nepe_id, id) FROM stdin;
    public       	   victordbu    false    202       2986.dat �          0    16438    dueno 
   TABLE DATA           L   COPY public.dueno (id, username, password, last_log, first_log) FROM stdin;
    public       	   victordbu    false    204       2988.dat �          0    16447    nepe 
   TABLE DATA           �   COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
    public       	   victordbu    false    206       2990.dat �           0    0    bregando_bregando_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.bregando_bregando_id_seq', 1024, false);
          public       	   victordbu    false    203         �           0    0    dueno_dueno_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.dueno_dueno_id_seq', 1024, false);
          public       	   victordbu    false    205         �           0    0    nepe_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.nepe_id_seq', 1024, false);
          public       	   victordbu    false    207         !           2606    16461    bregando bregando_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_pkey;
       public         	   victordbu    false    202         #           2606    16463    dueno dueno_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.dueno DROP CONSTRAINT dueno_pkey;
       public         	   victordbu    false    204         %           2606    16465    dueno dueno_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.dueno DROP CONSTRAINT dueno_username_key;
       public         	   victordbu    false    204         (           2606    16467    nepe nepe_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.nepe DROP CONSTRAINT nepe_pkey;
       public         	   victordbu    false    206         &           1259    16468    donde_vector_idx    INDEX     G   CREATE INDEX donde_vector_idx ON public.nepe USING gin (donde_vector);
 $   DROP INDEX public.donde_vector_idx;
       public         	   victordbu    false    206         )           1259    16469    nombre_que_vector_idx    INDEX     Q   CREATE INDEX nombre_que_vector_idx ON public.nepe USING gin (nombre_que_vector);
 )   DROP INDEX public.nombre_que_vector_idx;
       public         	   victordbu    false    206         *           2606    16470    bregando bregando_dueno_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_dueno_id_fkey FOREIGN KEY (dueno_id) REFERENCES public.dueno(id);
 I   ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_dueno_id_fkey;
       public       	   victordbu    false    204    2851    202         +           2606    16475    bregando bregando_nepe_id    FK CONSTRAINT     w   ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_nepe_id FOREIGN KEY (nepe_id) REFERENCES public.nepe(id);
 C   ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_nepe_id;
       public       	   victordbu    false    2856    206    202                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  2986.dat                                                                                            0000600 0004000 0002000 00000000005 13771401621 0014257 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2988.dat                                                                                            0000600 0004000 0002000 00000000005 13771401621 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2990.dat                                                                                            0000600 0004000 0002000 00000000005 13771401621 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000016570 13771401621 0015377 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE nepeype;
--
-- Name: nepeype; Type: DATABASE; Schema: -; Owner: victordbu
--

CREATE DATABASE nepeype WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE nepeype OWNER TO victordbu;

\connect nepeype

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: bregando; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.bregando (
    dueno_id integer NOT NULL,
    nepe_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.bregando OWNER TO victordbu;

--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.bregando_bregando_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bregando_bregando_id_seq OWNER TO victordbu;

--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.bregando_bregando_id_seq OWNED BY public.bregando.id;


--
-- Name: dueno; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.dueno (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(64) NOT NULL,
    last_log date DEFAULT '2010-01-01'::date NOT NULL,
    first_log date DEFAULT '2010-01-01'::date NOT NULL,
    CONSTRAINT dueno_first_log_check CHECK ((first_log > '2009-12-31'::date)),
    CONSTRAINT dueno_last_log_check CHECK ((last_log > '2009-12-31'::date))
);


ALTER TABLE public.dueno OWNER TO victordbu;

--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_dueno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dueno_dueno_id_seq OWNER TO victordbu;

--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_dueno_id_seq OWNED BY public.dueno.id;


--
-- Name: nepe; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.nepe (
    id integer NOT NULL,
    nombre character varying(64) NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    media_video_url character varying(128) NOT NULL,
    media_social_handle json NOT NULL,
    media_foto_url character varying(64)[] NOT NULL,
    que character varying(64)[] NOT NULL,
    donde character varying(64)[] NOT NULL,
    a_tu_casa boolean NOT NULL,
    nombre_que_vector tsvector NOT NULL,
    donde_vector tsvector NOT NULL,
    cuando json NOT NULL,
    CONSTRAINT nepe_revisado_check CHECK ((revisado > '2009-12-31'::date))
);


ALTER TABLE public.nepe OWNER TO victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nepe_id_seq OWNER TO victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;


--
-- Name: bregando id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando ALTER COLUMN id SET DEFAULT nextval('public.bregando_bregando_id_seq'::regclass);


--
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_dueno_id_seq'::regclass);


--
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- Data for Name: bregando; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.bregando (dueno_id, nepe_id, id) FROM stdin;
\.
COPY public.bregando (dueno_id, nepe_id, id) FROM '$$PATH$$/2986.dat';

--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, username, password, last_log, first_log) FROM stdin;
\.
COPY public.dueno (id, username, password, last_log, first_log) FROM '$$PATH$$/2988.dat';

--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
\.
COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM '$$PATH$$/2990.dat';

--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.bregando_bregando_id_seq', 1024, false);


--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_dueno_id_seq', 1024, false);


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', 1024, false);


--
-- Name: bregando bregando_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_username_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_username_key UNIQUE (username);


--
-- Name: nepe nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);


--
-- Name: donde_vector_idx; Type: INDEX; Schema: public; Owner: victordbu
--

CREATE INDEX donde_vector_idx ON public.nepe USING gin (donde_vector);


--
-- Name: nombre_que_vector_idx; Type: INDEX; Schema: public; Owner: victordbu
--

CREATE INDEX nombre_que_vector_idx ON public.nepe USING gin (nombre_que_vector);


--
-- Name: bregando bregando_dueno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_dueno_id_fkey FOREIGN KEY (dueno_id) REFERENCES public.dueno(id);


--
-- Name: bregando bregando_nepe_id; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_nepe_id FOREIGN KEY (nepe_id) REFERENCES public.nepe(id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        