'use server';

/**
 * @fileOverview AI-Powered Visualizer Flow.
 *
 * Allows users to upload a photo of their car and visualize different paint colors or body repair options using AI.
 * Implements the AIPoweredVisualizer story.
 *
 * @function aiPoweredVisualizer - The main function to visualize car customization options.
 * @typedef {Object} AiPoweredVisualizerInput - Input type for the aiPoweredVisualizer function.
 * @typedef {Object} AiPoweredVisualizerOutput - Output type for the aiPoweredVisualizer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredVisualizerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the car to visualize customization options on, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  customizationDescription: z
    .string()
    .describe('A description of the desired customization, e.g., \'a red paint job\' or \'remove the dent on the driver side door\'.'),
});

export type AiPoweredVisualizerInput = z.infer<typeof AiPoweredVisualizerInputSchema>;

const AiPoweredVisualizerOutputSchema = z.object({
  visualizedImage: z
    .string()
    .describe('The visualized image of the car with the applied customization, as a data URI.'),
});

export type AiPoweredVisualizerOutput = z.infer<typeof AiPoweredVisualizerOutputSchema>;

export async function aiPoweredVisualizer(input: AiPoweredVisualizerInput): Promise<AiPoweredVisualizerOutput> {
  return aiPoweredVisualizerFlow(input);
}

const aiPoweredVisualizerPrompt = ai.definePrompt({
  name: 'aiPoweredVisualizerPrompt',
  input: {schema: AiPoweredVisualizerInputSchema},
  output: {schema: AiPoweredVisualizerOutputSchema},
  prompt: [
    {
      media: {url: '{{photoDataUri}}'},
    },
    {
      text: 'Apply the following customization to the car in the image: {{{customizationDescription}}}.  Return the result as a data URI.',
    },
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const aiPoweredVisualizerFlow = ai.defineFlow(
  {
    name: 'aiPoweredVisualizerFlow',
    inputSchema: AiPoweredVisualizerInputSchema,
    outputSchema: AiPoweredVisualizerOutputSchema,
  },
  async input => {
    const {media} = await aiPoweredVisualizerPrompt(input);
    return {visualizedImage: media!.url!};
  }
);
