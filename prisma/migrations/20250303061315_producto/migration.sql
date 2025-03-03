-- CreateTable
CREATE TABLE "producto" (
    "id" TEXT NOT NULL,
    "productoDescripcion" VARCHAR(255) NOT NULL,
    "productoCode" VARCHAR(255) NOT NULL,
    "productoUnidad" VARCHAR(255) NOT NULL,
    "marcaId" INTEGER NOT NULL,
    "precioUnit" DECIMAL(5,4) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "isDelete" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" VARCHAR(255) NOT NULL,
    "updatedBy" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producto_productoCode_key" ON "producto"("productoCode");

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
