-- CreateTable
CREATE TABLE "question" (
    "id" SERIAL NOT NULL,
    "question" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" SERIAL NOT NULL,
    "answer" VARCHAR(500) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
