'use server'

import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { error } from 'console'

const FormSchema = z.object({
	id: z.string(),
	customerId: z.string({
		invalid_type_error: 'Please select a customer.'
	}),
	amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater that $0.' }),
	date: z.string(),
	status: z.enum(['pending', 'paid'], {
		invalid_type_error: 'Please select an invoice status.'
	}),
})

export type State = {
	errors?: {
	  customerId?: string[];
	  amount?: string[];
	  status?: string[];
	};
	message?: string | null;
  };

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export async function createInvoice(prevState: State, formData: FormData) {
	const validatedFields = CreateInvoice.safeParse({
		customerId: formData.get('customerId'),
		amount: formData.get('amount'),
		status: formData.get('status'),
	})
	
	if(!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing field. Faild to create Invoice.'
		}
	}

	const { customerId, amount, status } = validatedFields.data

	const amountInCents = amount * 100
	const date = new Date().toISOString().split('T')[0]

	try {
		await sql`
		  INSERT INTO invoices (customer_id, amount, status, date)
		  VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
		`;
	  } catch (error) {
		return {
		  message: 'Database Error: Failed to Create Invoice.',
		};
	  }
	 
  revalidatePath('dashboard/invoices')
  redirect('dashboard/invoices')
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if(!validatedFields.success) {
	return {
		errors: validatedFields.error.flatten().fieldErrors,
		message: 'Missing fields. Faild to Update Invoice.'
	}
  }

  const { customerId, amount, status } = validatedFields.data
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
	try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
  }