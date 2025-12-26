import React from 'react'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card'


type FormCardProps = {
    title?: string | React.ReactNode
    description?: string | React.ReactNode
    content: React.ReactNode
    titleIcon?: React.ReactNode
    withTitle?: boolean
}

function FormCard({
    title = "",
    description = "",
    content,
    titleIcon = "",
    withTitle=true
}: FormCardProps) {
    return (
        <Card className='p-5'>
            {
                withTitle && (
                    <CardTitle>
                        <div className='flex justify-start items-center'>
                            {titleIcon}
                            {title}
                        </div>
                        <CardDescription className='pt-3'>
                            {description}
                        </CardDescription>
                    </CardTitle>
                )
            }
            <CardContent className='px-0 mt-3'>
                {content}
            </CardContent>
        </Card>
    )
}

export default FormCard