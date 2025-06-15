
-- 1. Добавим колонку status в таблицу wishes (по умолчанию "unfulfilled")
ALTER TABLE public.wishes ADD COLUMN status TEXT DEFAULT 'unfulfilled';

-- 2. (Необязательно) Обновить все существующие записи, если есть
UPDATE public.wishes SET status = 'unfulfilled' WHERE status IS NULL;
