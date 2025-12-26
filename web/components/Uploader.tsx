"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useDropzone } from "react-dropzone";
import { Loader2, Trash2 } from "lucide-react";
import { useUpload } from "@/hooks/use-uploader";
import { useEffect } from "react";
import { CreateEventFormType } from "./Forms/CreateEventForm";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";


export function Uploader() {
  const form = useFormContext()
  const { files, handleFiles, handleRejected, removeFile } = useUpload({form});

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFiles,
    onDropRejected: handleRejected,
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
    accept: { "image/*": [] },
  });



  useEffect(() => {
    const file = files[0]
    if (files.length === 0) {
      form.setValue('image', "")
    }
    if (file) {
      if (!file.uploading && !file.error && file.url) {
        form.setValue('image', file.url)
      }
    }
  }, [files])


  return (
    <>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Immagine
            </FormLabel>
            <FormControl>
              <Card
                {...getRootProps()}
                className={cn(
                  "relative border-[#222222] bg-[#F9F9F9]   border border-dashed transition-colors duration-200 ease-in-out w-full h-full",
                  isDragActive
                    ? "border-primary bg-primary/10 border-solid"
                    : "border-[#222222] hover:border-border",
                  files.length > 0 && "hidden h-0"
                )}
              >

                <CardContent className="flex items-center justify-center h-full w-full">
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-center">Drop the files here ...</p>
                  ) : (
                    <div className="flex flex-col items-center gap-y-1">
                      <p>{"Trascina o seleziona un'immagine"}</p>
                      <span className=" text-sm text-slate-500">
                        {"(Es. Locandina o foto della location)"}
                      </span>
                      <Button className=" rounded-md mt-5">Seleziona</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {files.length > 0 && (
        <Card className={"relative border-2 border-dashed transition-colors duration-200 ease-in-out max-w-full max-h-full"}>
          <CardContent>
            {files.map((fileObj) => (
              <div key={fileObj.id} className="flex flex-col gap-1">
                <div className="relative aspect-video rounded-lg overflow-hidden">


                  <img
                    src={fileObj.objectUrl}
                    alt={fileObj.file.name}
                    className="w-full h-full object-center object-cover"
                  />


                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      form.setValue('image', "")
                      removeFile(fileObj.id)
                    }}
                    disabled={fileObj.isDeleting}
                  >
                    {fileObj.isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>

                  {fileObj.uploading && !fileObj.isDeleting && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white font-medium text-lg">
                        {fileObj.progress}%
                      </div>
                    </div>
                  )}

                  {fileObj.error && (
                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                      <div className="text-white font-medium">Errore</div>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </CardContent>
        </Card>
      )}




    </>
  )

}



/**
 *     <FormField
        control={form.control}
        name='image'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Immagine
            </FormLabel>
            <FormControl>
              <Card
                {...getRootProps()}
                className={cn(
                  "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-full",
                  isDragActive
                    ? "border-primary bg-primary/10 border-solid"
                    : "border-border hover:border-primary"
                )}
              >
                <CardContent className="flex items-center justify-center h-full w-full">
                  <input {...getInputProps()} />
                   {isDragActive ? (
                      <p className="text-center">Drop the files here ...</p>
                    ) : (
                      <div className="flex flex-col items-center gap-y-1">
                        <p>{"Trascina o seleziona un'immagine"}</p>
                        <span className=" text-sm text-slate-500">
                          {"(Es. Locandina o foto della location)"}
                        </span>
                        <Button className=" mt-5">Seleziona</Button>
                      </div>
                    )}
                  {files.length > 0 ? (
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                      {files.map((fileObj) => (
                        <div key={fileObj.id} className="flex flex-col gap-1">
                          <div className="relative aspect-square rounded-lg overflow-hidden">
                            <img
                              src={fileObj.objectUrl}
                              alt={fileObj.file.name}
                              className="w-full h-full object-cover"
                            />

                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile(fileObj.id)
                                form.setValue('image', "")
                              }}
                              disabled={fileObj.isDeleting}
                            >
                              {fileObj.isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>

                            {fileObj.uploading && !fileObj.isDeleting && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="text-white font-medium text-lg">
                                  {fileObj.progress}%
                                </div>
                              </div>
                            )}

                            {fileObj.error && (
                              <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
                                <div className="text-white font-medium">Errore</div>
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground truncate px-1">
                            {fileObj.file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                   null
                  )}
                </CardContent>
              </Card>

            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

 */