-- --
-- -- PostgreSQL database dump
-- --

-- -- Dumped from database version 14.2
-- -- Dumped by pg_dump version 14.2

-- -- Started on 2022-04-05 19:17:42

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- --
-- -- TOC entry 3 (class 2615 OID 43203)
-- -- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
-- --

-- CREATE SCHEMA public;



-- SET default_tablespace = '';

-- SET default_table_access_method = heap;

-- --
-- -- TOC entry 226 (class 1259 OID 66962)
-- -- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Comment" (
--     id integer NOT NULL,
--     "userId" integer NOT NULL,
--     "photoId" integer,
--     payload text NOT NULL,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL
-- );



-- --
-- -- TOC entry 225 (class 1259 OID 66961)
-- -- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."Comment_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3411 (class 0 OID 0)
-- -- Dependencies: 225
-- -- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


-- --
-- -- TOC entry 215 (class 1259 OID 43236)
-- -- Name: Hashtag; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Hashtag" (
--     id integer NOT NULL,
--     hashtag text NOT NULL,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL
-- );



-- --
-- -- TOC entry 214 (class 1259 OID 43235)
-- -- Name: Hashtag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."Hashtag_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3414 (class 0 OID 0)
-- -- Dependencies: 214
-- -- Name: Hashtag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."Hashtag_id_seq" OWNED BY public."Hashtag".id;


-- --
-- -- TOC entry 219 (class 1259 OID 43560)
-- -- Name: Like; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Like" (
--     id integer NOT NULL,
--     "userId" integer NOT NULL,
--     "photoId" integer,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL
-- );



-- --
-- -- TOC entry 218 (class 1259 OID 43559)
-- -- Name: Like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."Like_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3417 (class 0 OID 0)
-- -- Dependencies: 218
-- -- Name: Like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."Like_id_seq" OWNED BY public."Like".id;


-- --
-- -- TOC entry 223 (class 1259 OID 50410)
-- -- Name: Message; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Message" (
--     id integer NOT NULL,
--     "userId" integer NOT NULL,
--     "roomId" integer NOT NULL,
--     payload text NOT NULL,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL,
--     read boolean DEFAULT false NOT NULL
-- );



-- --
-- -- TOC entry 222 (class 1259 OID 50409)
-- -- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."Message_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3420 (class 0 OID 0)
-- -- Dependencies: 222
-- -- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


-- --
-- -- TOC entry 213 (class 1259 OID 43226)
-- -- Name: Photo; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Photo" (
--     id integer NOT NULL,
--     "userId" integer NOT NULL,
--     file text NOT NULL,
--     caption text,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL
-- );



-- --
-- -- TOC entry 212 (class 1259 OID 43225)
-- -- Name: Photo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."Photo_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3423 (class 0 OID 0)
-- -- Dependencies: 212
-- -- Name: Photo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."Photo_id_seq" OWNED BY public."Photo".id;


-- --
-- -- TOC entry 221 (class 1259 OID 50402)
-- -- Name: Room; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."Room" (
--     id integer NOT NULL,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL
-- );



-- --
-- -- TOC entry 220 (class 1259 OID 50401)
-- -- Name: Room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."Room_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3426 (class 0 OID 0)
-- -- Dependencies: 220
-- -- Name: Room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."Room_id_seq" OWNED BY public."Room".id;


-- --
-- -- TOC entry 211 (class 1259 OID 43216)
-- -- Name: User; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."User" (
--     id integer NOT NULL,
--     "firstName" text NOT NULL,
--     "lastName" text,
--     "userName" text NOT NULL,
--     email text NOT NULL,
--     password text NOT NULL,
--     bio text,
--     avatar text,
--     "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
--     "updatedAt" timestamp(3) without time zone NOT NULL
-- );



-- --
-- -- TOC entry 210 (class 1259 OID 43215)
-- -- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
-- --

-- CREATE SEQUENCE public."User_id_seq"
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;



-- --
-- -- TOC entry 3429 (class 0 OID 0)
-- -- Dependencies: 210
-- -- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
-- --

-- ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


-- --
-- -- TOC entry 217 (class 1259 OID 43248)
-- -- Name: _HashtagToPhoto; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."_HashtagToPhoto" (
--     "A" integer NOT NULL,
--     "B" integer NOT NULL
-- );



-- --
-- -- TOC entry 224 (class 1259 OID 50419)
-- -- Name: _RoomToUser; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."_RoomToUser" (
--     "A" integer NOT NULL,
--     "B" integer NOT NULL
-- );



-- --
-- -- TOC entry 216 (class 1259 OID 43245)
-- -- Name: _followUser; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public."_followUser" (
--     "A" integer NOT NULL,
--     "B" integer NOT NULL
-- );



-- --
-- -- TOC entry 209 (class 1259 OID 43204)
-- -- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
-- --

-- CREATE TABLE public._prisma_migrations (
--     id character varying(36) NOT NULL,
--     checksum character varying(64) NOT NULL,
--     finished_at timestamp with time zone,
--     migration_name character varying(255) NOT NULL,
--     logs text,
--     rolled_back_at timestamp with time zone,
--     started_at timestamp with time zone DEFAULT now() NOT NULL,
--     applied_steps_count integer DEFAULT 0 NOT NULL
-- );



-- --
-- -- TOC entry 3225 (class 2604 OID 66965)
-- -- Name: Comment id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


-- --
-- -- TOC entry 3216 (class 2604 OID 43239)
-- -- Name: Hashtag id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Hashtag" ALTER COLUMN id SET DEFAULT nextval('public."Hashtag_id_seq"'::regclass);


-- --
-- -- TOC entry 3218 (class 2604 OID 43563)
-- -- Name: Like id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Like" ALTER COLUMN id SET DEFAULT nextval('public."Like_id_seq"'::regclass);


-- --
-- -- TOC entry 3222 (class 2604 OID 50413)
-- -- Name: Message id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);


-- --
-- -- TOC entry 3214 (class 2604 OID 43229)
-- -- Name: Photo id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Photo" ALTER COLUMN id SET DEFAULT nextval('public."Photo_id_seq"'::regclass);


-- --
-- -- TOC entry 3220 (class 2604 OID 50405)
-- -- Name: Room id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Room" ALTER COLUMN id SET DEFAULT nextval('public."Room_id_seq"'::regclass);


-- --
-- -- TOC entry 3212 (class 2604 OID 43219)
-- -- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


-- --
-- -- TOC entry 3252 (class 2606 OID 66970)
-- -- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Comment"
--     ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3237 (class 2606 OID 43244)
-- -- Name: Hashtag Hashtag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Hashtag"
--     ADD CONSTRAINT "Hashtag_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3243 (class 2606 OID 43566)
-- -- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Like"
--     ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3248 (class 2606 OID 50418)
-- -- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Message"
--     ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3234 (class 2606 OID 43234)
-- -- Name: Photo Photo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Photo"
--     ADD CONSTRAINT "Photo_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3246 (class 2606 OID 50408)
-- -- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Room"
--     ADD CONSTRAINT "Room_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3231 (class 2606 OID 43224)
-- -- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."User"
--     ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


-- --
-- -- TOC entry 3228 (class 2606 OID 43212)
-- -- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public._prisma_migrations
--     ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


-- --
-- -- TOC entry 3235 (class 1259 OID 43253)
-- -- Name: Hashtag_hashtag_key; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "Hashtag_hashtag_key" ON public."Hashtag" USING btree (hashtag);


-- --
-- -- TOC entry 3244 (class 1259 OID 43925)
-- -- Name: Like_userId_photoId_key; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "Like_userId_photoId_key" ON public."Like" USING btree ("userId", "photoId");


-- --
-- -- TOC entry 3229 (class 1259 OID 43252)
-- -- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


-- --
-- -- TOC entry 3232 (class 1259 OID 43251)
-- -- Name: User_userName_key; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "User_userName_key" ON public."User" USING btree ("userName");


-- --
-- -- TOC entry 3240 (class 1259 OID 43256)
-- -- Name: _HashtagToPhoto_AB_unique; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "_HashtagToPhoto_AB_unique" ON public."_HashtagToPhoto" USING btree ("A", "B");


-- --
-- -- TOC entry 3241 (class 1259 OID 43257)
-- -- Name: _HashtagToPhoto_B_index; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE INDEX "_HashtagToPhoto_B_index" ON public."_HashtagToPhoto" USING btree ("B");


-- --
-- -- TOC entry 3249 (class 1259 OID 50422)
-- -- Name: _RoomToUser_AB_unique; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON public."_RoomToUser" USING btree ("A", "B");


-- --
-- -- TOC entry 3250 (class 1259 OID 50423)
-- -- Name: _RoomToUser_B_index; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE INDEX "_RoomToUser_B_index" ON public."_RoomToUser" USING btree ("B");


-- --
-- -- TOC entry 3238 (class 1259 OID 43254)
-- -- Name: _followUser_AB_unique; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE UNIQUE INDEX "_followUser_AB_unique" ON public."_followUser" USING btree ("A", "B");


-- --
-- -- TOC entry 3239 (class 1259 OID 43255)
-- -- Name: _followUser_B_index; Type: INDEX; Schema: public; Owner: postgres
-- --

-- CREATE INDEX "_followUser_B_index" ON public."_followUser" USING btree ("B");


-- --
-- -- TOC entry 3265 (class 2606 OID 75871)
-- -- Name: Comment Comment_photoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Comment"
--     ADD CONSTRAINT "Comment_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- --
-- -- TOC entry 3264 (class 2606 OID 66971)
-- -- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Comment"
--     ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- --
-- -- TOC entry 3259 (class 2606 OID 75866)
-- -- Name: Like Like_photoId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Like"
--     ADD CONSTRAINT "Like_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES public."Photo"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- --
-- -- TOC entry 3258 (class 2606 OID 43567)
-- -- Name: Like Like_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Like"
--     ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- --
-- -- TOC entry 3261 (class 2606 OID 50429)
-- -- Name: Message Message_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Message"
--     ADD CONSTRAINT "Message_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- --
-- -- TOC entry 3260 (class 2606 OID 50424)
-- -- Name: Message Message_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Message"
--     ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- --
-- -- TOC entry 3253 (class 2606 OID 76544)
-- -- Name: Photo Photo_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."Photo"
--     ADD CONSTRAINT "Photo_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- --
-- -- TOC entry 3256 (class 2606 OID 43273)
-- -- Name: _HashtagToPhoto _HashtagToPhoto_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."_HashtagToPhoto"
--     ADD CONSTRAINT "_HashtagToPhoto_A_fkey" FOREIGN KEY ("A") REFERENCES public."Hashtag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- --
-- -- TOC entry 3257 (class 2606 OID 43278)
-- -- Name: _HashtagToPhoto _HashtagToPhoto_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."_HashtagToPhoto"
--     ADD CONSTRAINT "_HashtagToPhoto_B_fkey" FOREIGN KEY ("B") REFERENCES public."Photo"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- --
-- -- TOC entry 3262 (class 2606 OID 50434)
-- -- Name: _RoomToUser _RoomToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."_RoomToUser"
--     ADD CONSTRAINT "_RoomToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Room"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- --
-- -- TOC entry 3263 (class 2606 OID 50439)
-- -- Name: _RoomToUser _RoomToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."_RoomToUser"
--     ADD CONSTRAINT "_RoomToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- --
-- -- TOC entry 3254 (class 2606 OID 43263)
-- -- Name: _followUser _followUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."_followUser"
--     ADD CONSTRAINT "_followUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- --
-- -- TOC entry 3255 (class 2606 OID 43268)
-- -- Name: _followUser _followUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
-- --

-- ALTER TABLE ONLY public."_followUser"
--     ADD CONSTRAINT "_followUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


