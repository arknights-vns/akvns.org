"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Field, FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet, FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FeatureFlag, FeatureIdRegex } from "@/schema/feature";

type FeatureFormProperties = {
    defaultValues: z.infer<typeof FeatureFlag>;
    formSchema: typeof FeatureFlag;
    isEdit: boolean;
    submitCallbackAction: (data: z.infer<typeof FeatureFlag> & { idOld: string }) => unknown;
};

/**
 * The feature edit/create form.
 *
 * You should put this as follows:
 *
 * ```jsx
 * <DialogContent>
 *     <DialogHeader />
 *     { here }
 *     <DialogFooter />
 * </DialogContent>
 * ```
 * @param properties The required properties.
 */
export default function FeatureForm(properties: FeatureFormProperties) {
    const fieldId = useId();

    const localSchema = properties.formSchema.extend({
        idOld: z.string().regex(FeatureIdRegex),
    }).transform(schema => ({
        ...schema,
        idOld: schema.idOld ?? schema.id,
    }));

    const form = useForm<z.infer<typeof localSchema>>({
        defaultValues: {
            ...properties.defaultValues,
            idOld: properties.defaultValues.id,
        },
        mode: "onChange",
        resolver: zodResolver(localSchema),
    });

    function onSubmit(data: z.infer<typeof localSchema>) {
        properties.submitCallbackAction(data);
    }

    return (
        <Card className={"w-full sm:max-w-md"}>
            <CardContent>
                <form id={`form-feature-${fieldId}`} onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name={"id"}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`form-feature-id-${fieldId}`}>
                                        Flag
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete={"off"}
                                        className={"font-mono"}
                                        id={`form-feature-id-${fieldId}`}
                                        placeholder={"VNS_HAIDILAO_MAJOR_ORDER"}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name={"description"}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`form-feature-description-${fieldId}`}>
                                        Mô tả
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete={"off"}
                                        id={`form-feature-description-${fieldId}`}
                                        placeholder={"Where Haidilao?"}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name={"group"}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`form-feature-group-${fieldId}`}>
                                        Nhóm
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete={"off"}
                                        id={`form-feature-group-${fieldId}`}
                                        placeholder={"VNS TESTING"}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name={"enable"}
                            render={({ field, fieldState }) => (
                                <FieldSet>
                                    <FieldLegend>Trạng thái</FieldLegend>
                                    {/* <FieldDescription> */}
                                    {/*    You can upgrade or downgrade your plan at any time. */}
                                    {/* </FieldDescription> */}
                                    <RadioGroup
                                        className={"grid-flow-col"}
                                        name={field.name}
                                        onValueChange={field.onChange}
                                        // @ts-expect-error Field value is boolean
                                        value={field.value}
                                    >
                                        <FieldLabel htmlFor={`form-feature-enable`}>
                                            <Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
                                                <FieldContent>
                                                    <FieldTitle>Bật</FieldTitle>
                                                    <FieldDescription />
                                                </FieldContent>
                                                <RadioGroupItem
                                                    aria-invalid={fieldState.invalid}
                                                    id={`form-feature-enable`}
                                                    // @ts-expect-error Field value is boolean
                                                    value
                                                />
                                            </Field>
                                        </FieldLabel>
                                        <FieldLabel htmlFor={`form-feature-enable`}>
                                            <Field data-invalid={fieldState.invalid} orientation={"horizontal"}>
                                                <FieldContent>
                                                    <FieldTitle>Tắt</FieldTitle>
                                                    <FieldDescription />
                                                </FieldContent>
                                                <RadioGroupItem
                                                    aria-invalid={fieldState.invalid}
                                                    id={`form-feature-enable`}
                                                    // @ts-expect-error Field value is boolean
                                                    value={false}
                                                />
                                            </Field>
                                        </FieldLabel>
                                    </RadioGroup>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </FieldSet>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation={"horizontal"}>
                    <Button onClick={() => form.reset()} type={"button"} variant={"outline"}>
                        Reset
                    </Button>
                    <Button form={`form-feature-${fieldId}`} type={"submit"}>
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
