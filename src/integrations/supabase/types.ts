export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      access_ids: {
        Row: {
          access_code: string
          assigned_at: string | null
          assigned_to_email: string | null
          book_id: string
          created_at: string
          id: string
          status: string
        }
        Insert: {
          access_code: string
          assigned_at?: string | null
          assigned_to_email?: string | null
          book_id: string
          created_at?: string
          id?: string
          status?: string
        }
        Update: {
          access_code?: string
          assigned_at?: string | null
          assigned_to_email?: string | null
          book_id?: string
          created_at?: string
          id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_ids_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action_type: string
          admin_user_id: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
        }
        Insert: {
          action_type: string
          admin_user_id: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string | null
          event_type: string | null
          id: string
          location: string | null
          start_time: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          start_time: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          start_time?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      admin_tasks: {
        Row: {
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      analyst_profiles: {
        Row: {
          created_at: string
          department: string | null
          education_level: string | null
          id: string
          linkedin_url: string | null
          specialization: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          education_level?: string | null
          id?: string
          linkedin_url?: string | null
          specialization?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
          education_level?: string | null
          id?: string
          linkedin_url?: string | null
          specialization?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string | null
          event_category: string | null
          event_data: Json | null
          event_name: string
          id: string
          ip_address: string | null
          page_title: string | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_name: string
          id?: string
          ip_address?: string | null
          page_title?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_category?: string | null
          event_data?: Json | null
          event_name?: string
          id?: string
          ip_address?: string | null
          page_title?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          content: string
          created_at: string
          ends_at: string | null
          id: string
          is_active: boolean | null
          starts_at: string | null
          title: string
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          starts_at?: string | null
          title: string
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          ends_at?: string | null
          id?: string
          is_active?: boolean | null
          starts_at?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published_at: string | null
          scheduled_for: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published_at?: string | null
          scheduled_for?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_audit_logs: {
        Row: {
          action: string | null
          created_at: string | null
          email: string | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          reason: string | null
          role: string | null
          success: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          email?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          reason?: string | null
          role?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          email?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          reason?: string | null
          role?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      book_content: {
        Row: {
          book_id: string | null
          chapter_number: number | null
          chapter_title: string | null
          content: string | null
          content_html: string | null
          created_at: string
          id: string
          last_ai_update: string | null
          page_end: number | null
          page_start: number | null
          sort_order: number | null
        }
        Insert: {
          book_id?: string | null
          chapter_number?: number | null
          chapter_title?: string | null
          content?: string | null
          content_html?: string | null
          created_at?: string
          id?: string
          last_ai_update?: string | null
          page_end?: number | null
          page_start?: number | null
          sort_order?: number | null
        }
        Update: {
          book_id?: string | null
          chapter_number?: number | null
          chapter_title?: string | null
          content?: string | null
          content_html?: string | null
          created_at?: string
          id?: string
          last_ai_update?: string | null
          page_end?: number | null
          page_start?: number | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_content_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_purchases: {
        Row: {
          amount: number | null
          book_id: string | null
          created_at: string
          id: string
          payment_status: string | null
          stripe_payment_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          book_id?: string | null
          created_at?: string
          id?: string
          payment_status?: string | null
          stripe_payment_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          book_id?: string | null
          created_at?: string
          id?: string
          payment_status?: string | null
          stripe_payment_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_purchases_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_requests: {
        Row: {
          author: string | null
          book_title: string | null
          created_at: string
          customer_name: string | null
          description: string | null
          email: string | null
          id: string
          reason: string | null
          status: string | null
          topic: string | null
          user_id: string | null
        }
        Insert: {
          author?: string | null
          book_title?: string | null
          created_at?: string
          customer_name?: string | null
          description?: string | null
          email?: string | null
          id?: string
          reason?: string | null
          status?: string | null
          topic?: string | null
          user_id?: string | null
        }
        Update: {
          author?: string | null
          book_title?: string | null
          created_at?: string
          customer_name?: string | null
          description?: string | null
          email?: string | null
          id?: string
          reason?: string | null
          status?: string | null
          topic?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      booking_requests: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          base_price: number | null
          created_at: string
          discount_amount: number | null
          email: string
          final_price: number | null
          full_name: string
          id: string
          is_veteran: boolean | null
          message: string | null
          metadata: Json | null
          phone: string | null
          preferred_dates: string | null
          request_number: string
          service_name: string
          service_tier: string | null
          service_type: string
          status: string
          updated_at: string
          user_id: string | null
          veteran_id_last4: string | null
          veteran_type: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          base_price?: number | null
          created_at?: string
          discount_amount?: number | null
          email: string
          final_price?: number | null
          full_name: string
          id?: string
          is_veteran?: boolean | null
          message?: string | null
          metadata?: Json | null
          phone?: string | null
          preferred_dates?: string | null
          request_number?: string
          service_name: string
          service_tier?: string | null
          service_type: string
          status?: string
          updated_at?: string
          user_id?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          base_price?: number | null
          created_at?: string
          discount_amount?: number | null
          email?: string
          final_price?: number | null
          full_name?: string
          id?: string
          is_veteran?: boolean | null
          message?: string | null
          metadata?: Json | null
          phone?: string | null
          preferred_dates?: string | null
          request_number?: string
          service_name?: string
          service_tier?: string | null
          service_type?: string
          status?: string
          updated_at?: string
          user_id?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_requests_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string | null
          bulk_price: number | null
          category: string | null
          cover_image: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          is_free: boolean | null
          is_published: boolean | null
          pages: number | null
          price: number | null
          slug: string | null
          status: string | null
          stripe_price_id: string | null
          subtitle: string | null
          tag: string | null
          title: string
          total_pages: number | null
          updated_at: string
        }
        Insert: {
          author?: string | null
          bulk_price?: number | null
          category?: string | null
          cover_image?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          is_published?: boolean | null
          pages?: number | null
          price?: number | null
          slug?: string | null
          status?: string | null
          stripe_price_id?: string | null
          subtitle?: string | null
          tag?: string | null
          title: string
          total_pages?: number | null
          updated_at?: string
        }
        Update: {
          author?: string | null
          bulk_price?: number | null
          category?: string | null
          cover_image?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          is_published?: boolean | null
          pages?: number | null
          price?: number | null
          slug?: string | null
          status?: string | null
          stripe_price_id?: string | null
          subtitle?: string | null
          tag?: string | null
          title?: string
          total_pages?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      campaign_recipients: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          created_at: string | null
          id: string
          opened_at: string | null
          recipient_email: string
          recipient_name: string | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          recipient_email: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          created_at?: string | null
          id?: string
          opened_at?: string | null
          recipient_email?: string
          recipient_name?: string | null
          sent_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      caregiver_profiles: {
        Row: {
          availability_afternoons: boolean | null
          availability_evenings: boolean | null
          availability_mornings: boolean | null
          availability_nights: boolean | null
          availability_weekends: boolean | null
          available_hours_per_week: number | null
          background_check_consent: boolean | null
          background_check_status: string | null
          certification_number: string | null
          certification_type: string | null
          created_at: string
          id: string
          reference1_email: string | null
          reference1_name: string | null
          reference1_phone: string | null
          reference2_email: string | null
          reference2_name: string | null
          reference2_phone: string | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          availability_afternoons?: boolean | null
          availability_evenings?: boolean | null
          availability_mornings?: boolean | null
          availability_nights?: boolean | null
          availability_weekends?: boolean | null
          available_hours_per_week?: number | null
          background_check_consent?: boolean | null
          background_check_status?: string | null
          certification_number?: string | null
          certification_type?: string | null
          created_at?: string
          id?: string
          reference1_email?: string | null
          reference1_name?: string | null
          reference1_phone?: string | null
          reference2_email?: string | null
          reference2_name?: string | null
          reference2_phone?: string | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          availability_afternoons?: boolean | null
          availability_evenings?: boolean | null
          availability_mornings?: boolean | null
          availability_nights?: boolean | null
          availability_weekends?: boolean | null
          available_hours_per_week?: number | null
          background_check_consent?: boolean | null
          background_check_status?: string | null
          certification_number?: string | null
          certification_type?: string | null
          created_at?: string
          id?: string
          reference1_email?: string | null
          reference1_name?: string | null
          reference1_phone?: string | null
          reference2_email?: string | null
          reference2_name?: string | null
          reference2_phone?: string | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      client_messages: {
        Row: {
          client_id: string | null
          content: string | null
          created_at: string
          id: string
          is_from_client: boolean | null
          is_read: boolean | null
          is_starred: boolean | null
          message: string
          message_type: string | null
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          subject: string | null
        }
        Insert: {
          client_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_from_client?: boolean | null
          is_read?: boolean | null
          is_starred?: boolean | null
          message: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Update: {
          client_id?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_from_client?: boolean | null
          is_read?: boolean | null
          is_starred?: boolean | null
          message?: string
          message_type?: string | null
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_notes: {
        Row: {
          author_id: string | null
          client_id: string | null
          content: string
          created_at: string
          id: string
          importance: string | null
          is_pinned: boolean | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          author_id?: string | null
          client_id?: string | null
          content: string
          created_at?: string
          id?: string
          importance?: string | null
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          author_id?: string | null
          client_id?: string | null
          content?: string
          created_at?: string
          id?: string
          importance?: string | null
          is_pinned?: boolean | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_notes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          tags: string[] | null
          total_spent: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          total_spent?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          tags?: string[] | null
          total_spent?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          position: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      conversion_events: {
        Row: {
          conversion_type: string
          conversion_value: number | null
          created_at: string | null
          id: string
          metadata: Json | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          conversion_type: string
          conversion_value?: number | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          conversion_type?: string
          conversion_value?: number | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_lessons: {
        Row: {
          content: string | null
          created_at: string
          duration_minutes: number | null
          id: string
          is_free: boolean | null
          module_id: string | null
          sort_order: number | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_free?: boolean | null
          module_id?: string | null
          sort_order?: number | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_free?: boolean | null
          module_id?: string | null
          sort_order?: number | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string | null
          created_at: string
          description: string | null
          duration_minutes: number | null
          id: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          id?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration_hours: number | null
          id: string
          instructor_id: string | null
          level: string | null
          max_students: number | null
          price: number | null
          slug: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          instructor_id?: string | null
          level?: string | null
          max_students?: number | null
          price?: number | null
          slug?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration_hours?: number | null
          id?: string
          instructor_id?: string | null
          level?: string | null
          max_students?: number | null
          price?: number | null
          slug?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      dashboard_health: {
        Row: {
          created_at: string
          dashboard_name: string
          dashboard_url: string
          error_message: string | null
          id: string
          last_check: string | null
          response_time_ms: number | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dashboard_name: string
          dashboard_url: string
          error_message?: string | null
          id?: string
          last_check?: string | null
          response_time_ms?: number | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dashboard_name?: string
          dashboard_url?: string
          error_message?: string | null
          id?: string
          last_check?: string | null
          response_time_ms?: number | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      developer_profiles: {
        Row: {
          created_at: string
          developer_role: string | null
          github_portfolio_url: string | null
          id: string
          tech_stack: string[] | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          created_at?: string
          developer_role?: string | null
          github_portfolio_url?: string | null
          id?: string
          tech_stack?: string[] | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          created_at?: string
          developer_role?: string | null
          github_portfolio_url?: string | null
          id?: string
          tech_stack?: string[] | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          donation_type: string | null
          donor_name: string
          email: string
          id: string
          message: string | null
          payment_status: string | null
          stripe_payment_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          donation_type?: string | null
          donor_name: string
          email: string
          id?: string
          message?: string | null
          payment_status?: string | null
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          donation_type?: string | null
          donor_name?: string
          email?: string
          id?: string
          message?: string | null
          payment_status?: string | null
          stripe_payment_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          click_rate: number | null
          created_at: string | null
          id: string
          last_sent_at: string | null
          name: string
          open_rate: number | null
          schedule_config: Json | null
          schedule_type: string
          sent_count: number | null
          status: string | null
          subject: string
          target_audience: string
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          click_rate?: number | null
          created_at?: string | null
          id?: string
          last_sent_at?: string | null
          name: string
          open_rate?: number | null
          schedule_config?: Json | null
          schedule_type: string
          sent_count?: number | null
          status?: string | null
          subject: string
          target_audience: string
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          click_rate?: number | null
          created_at?: string | null
          id?: string
          last_sent_at?: string | null
          name?: string
          open_rate?: number | null
          schedule_config?: Json | null
          schedule_type?: string
          sent_count?: number | null
          status?: string | null
          subject?: string
          target_audience?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_delivery_logs: {
        Row: {
          bounced: boolean | null
          campaign_id: string | null
          clicked_at: string | null
          complained: boolean | null
          created_at: string | null
          delivered_at: string | null
          error_details: Json | null
          id: string
          opened_at: string | null
          provider_message_id: string | null
          recipient_email: string
          scheduled_email_id: string | null
          status: string
        }
        Insert: {
          bounced?: boolean | null
          campaign_id?: string | null
          clicked_at?: string | null
          complained?: boolean | null
          created_at?: string | null
          delivered_at?: string | null
          error_details?: Json | null
          id?: string
          opened_at?: string | null
          provider_message_id?: string | null
          recipient_email: string
          scheduled_email_id?: string | null
          status: string
        }
        Update: {
          bounced?: boolean | null
          campaign_id?: string | null
          clicked_at?: string | null
          complained?: boolean | null
          created_at?: string | null
          delivered_at?: string | null
          error_details?: Json | null
          id?: string
          opened_at?: string | null
          provider_message_id?: string | null
          recipient_email?: string
          scheduled_email_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_delivery_logs_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_delivery_logs_scheduled_email_id_fkey"
            columns: ["scheduled_email_id"]
            isOneToOne: false
            referencedRelation: "scheduled_emails"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          category: string | null
          created_at: string | null
          html_body: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_variables: Json | null
          text_body: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          html_body: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_variables?: Json | null
          text_body?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          html_body?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_variables?: Json | null
          text_body?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          completed_at: string | null
          contact_id: string | null
          course_id: string | null
          enrolled_at: string
          id: string
          last_accessed_at: string | null
          progress: number | null
          progress_percentage: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          contact_id?: string | null
          course_id?: string | null
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          progress_percentage?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          contact_id?: string | null
          course_id?: string | null
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          progress_percentage?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_published: boolean | null
          question: string
          sort_order: number | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          question: string
          sort_order?: number | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          question?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      funnel_steps: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          session_id: string
          step_name: string
          step_order: number
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          session_id: string
          step_name: string
          step_order: number
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          session_id?: string
          step_name?: string
          step_order?: number
        }
        Relationships: []
      }
      graphic_design_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      graphic_design_project_tags: {
        Row: {
          project_id: string
          tag_id: string
        }
        Insert: {
          project_id: string
          tag_id: string
        }
        Update: {
          project_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "graphic_design_project_tags_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "graphic_design_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "graphic_design_project_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "graphic_design_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      graphic_design_projects: {
        Row: {
          category_id: string | null
          client_name: string | null
          created_at: string
          created_by: string | null
          full_description: string | null
          gallery: Json | null
          hero_image_url: string | null
          id: string
          is_featured: boolean | null
          live_link: string | null
          project_year: number | null
          seo_meta_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          status: string
          thumbnail_url: string | null
          title: string
          tools_used: string | null
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          full_description?: string | null
          gallery?: Json | null
          hero_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          live_link?: string | null
          project_year?: number | null
          seo_meta_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          status?: string
          thumbnail_url?: string | null
          title: string
          tools_used?: string | null
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          full_description?: string | null
          gallery?: Json | null
          hero_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          live_link?: string | null
          project_year?: number | null
          seo_meta_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          status?: string
          thumbnail_url?: string | null
          title?: string
          tools_used?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "graphic_design_projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "graphic_design_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      graphic_design_tags: {
        Row: {
          category_id: string | null
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "graphic_design_tags_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "graphic_design_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_scans: {
        Row: {
          amount_paid: number | null
          content: string | null
          created_at: string
          deleted_at: string | null
          expires_at: string | null
          file_name: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          ip_address: string | null
          payment_status: string | null
          result: Json | null
          risk_level: string | null
          scan_status: string | null
          scan_type: string | null
          session_id: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount_paid?: number | null
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          expires_at?: string | null
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          ip_address?: string | null
          payment_status?: string | null
          result?: Json | null
          risk_level?: string | null
          scan_status?: string | null
          scan_type?: string | null
          session_id?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount_paid?: number | null
          content?: string | null
          created_at?: string
          deleted_at?: string | null
          expires_at?: string | null
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          ip_address?: string | null
          payment_status?: string | null
          result?: Json | null
          risk_level?: string | null
          scan_status?: string | null
          scan_type?: string | null
          session_id?: string | null
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      healthcare_professional_profiles: {
        Row: {
          created_at: string
          dea_number: string | null
          hospital_affiliation: string | null
          id: string
          license_number: string | null
          license_type: string | null
          medical_specialty: string | null
          updated_at: string
          user_id: string
          years_in_practice: number | null
        }
        Insert: {
          created_at?: string
          dea_number?: string | null
          hospital_affiliation?: string | null
          id?: string
          license_number?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string
          user_id: string
          years_in_practice?: number | null
        }
        Update: {
          created_at?: string
          dea_number?: string | null
          hospital_affiliation?: string | null
          id?: string
          license_number?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string
          user_id?: string
          years_in_practice?: number | null
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          availability: string | null
          cover_letter: string
          created_at: string
          email: string
          id: string
          is_veteran: boolean | null
          name: string
          phone: string
          position: string
          resume_url: string | null
          status: string
          updated_at: string
          veteran_document_url: string | null
        }
        Insert: {
          availability?: string | null
          cover_letter: string
          created_at?: string
          email: string
          id?: string
          is_veteran?: boolean | null
          name: string
          phone: string
          position: string
          resume_url?: string | null
          status?: string
          updated_at?: string
          veteran_document_url?: string | null
        }
        Update: {
          availability?: string | null
          cover_letter?: string
          created_at?: string
          email?: string
          id?: string
          is_veteran?: boolean | null
          name?: string
          phone?: string
          position?: string
          resume_url?: string | null
          status?: string
          updated_at?: string
          veteran_document_url?: string | null
        }
        Relationships: []
      }
      knowledge_base_articles: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string
          display_order: number
          excerpt: string | null
          helpful_no: number
          helpful_yes: number
          id: string
          is_published: boolean | null
          slug: string | null
          tags: string[] | null
          title: string
          updated_at: string
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string
          display_order?: number
          excerpt?: string | null
          helpful_no?: number
          helpful_yes?: number
          id?: string
          is_published?: boolean | null
          slug?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string
          display_order?: number
          excerpt?: string | null
          helpful_no?: number
          helpful_yes?: number
          id?: string
          is_published?: boolean | null
          slug?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          related_id: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          related_id?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          related_id?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          field: string
          id: string
          is_published: boolean
          page_id: string
          section: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          field: string
          id?: string
          is_published?: boolean
          page_id: string
          section: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          field?: string
          id?: string
          is_published?: boolean
          page_id?: string
          section?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          page_title: string | null
          page_url: string
          referrer: string | null
          scroll_depth: number | null
          session_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          page_title?: string | null
          page_url: string
          referrer?: string | null
          scroll_depth?: number | null
          session_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          page_title?: string | null
          page_url?: string
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      partner_orders: {
        Row: {
          billing_address: Json | null
          cancelled_at: string | null
          commission_amount: number | null
          commission_rate: number | null
          created_at: string
          customer_email: string
          customer_id: string | null
          customer_name: string
          customer_phone: string | null
          delivered_at: string | null
          discount_amount: number | null
          id: string
          metadata: Json | null
          notes: string | null
          order_number: string
          partner_id: string
          payment_method: string | null
          payment_status:
            | Database["public"]["Enums"]["partner_payment_status"]
            | null
          payment_transaction_id: string | null
          shipped_at: string | null
          shipping_address: Json
          shipping_amount: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          billing_address?: Json | null
          cancelled_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customer_phone?: string | null
          delivered_at?: string | null
          discount_amount?: number | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_number: string
          partner_id: string
          payment_method?: string | null
          payment_status?:
            | Database["public"]["Enums"]["partner_payment_status"]
            | null
          payment_transaction_id?: string | null
          shipped_at?: string | null
          shipping_address: Json
          shipping_amount?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          billing_address?: Json | null
          cancelled_at?: string | null
          commission_amount?: number | null
          commission_rate?: number | null
          created_at?: string
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string | null
          delivered_at?: string | null
          discount_amount?: number | null
          id?: string
          metadata?: Json | null
          notes?: string | null
          order_number?: string
          partner_id?: string
          payment_method?: string | null
          payment_status?:
            | Database["public"]["Enums"]["partner_payment_status"]
            | null
          payment_transaction_id?: string | null
          shipped_at?: string | null
          shipping_address?: Json
          shipping_amount?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      password_reset_tokens: {
        Row: {
          created_at: string | null
          email: string
          expires_at: string
          id: string
          token: string
          used: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          token: string
          used?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used?: boolean | null
        }
        Relationships: []
      }
      portfolio_case_study_sections: {
        Row: {
          content: string | null
          created_at: string
          display_order: number
          id: string
          media_urls: string[] | null
          project_id: string
          section_type: string
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          display_order?: number
          id?: string
          media_urls?: string[] | null
          project_id: string
          section_type: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          display_order?: number
          id?: string
          media_urls?: string[] | null
          project_id?: string
          section_type?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_case_study_sections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          name: string
          slug: string
          updated_at: string
          visibility: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          slug: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          slug?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: []
      }
      portfolio_gallery: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          project_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          project_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_gallery_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_project_tags: {
        Row: {
          id: string
          project_id: string
          tag_id: string
        }
        Insert: {
          id?: string
          project_id: string
          tag_id: string
        }
        Update: {
          id?: string
          project_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_project_tags_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_project_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "portfolio_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          category_id: string | null
          client_name: string | null
          created_at: string
          created_by: string | null
          display_order: number
          featured: boolean
          hero_image_url: string | null
          id: string
          project_date: string | null
          short_description: string | null
          slug: string
          status: string
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          display_order?: number
          featured?: boolean
          hero_image_url?: string | null
          id?: string
          project_date?: string | null
          short_description?: string | null
          slug: string
          status?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          display_order?: number
          featured?: boolean
          hero_image_url?: string | null
          id?: string
          project_date?: string | null
          short_description?: string | null
          slug?: string
          status?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "portfolio_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_style_dictionary: {
        Row: {
          aliases: string[] | null
          canonical_term: string
          category: string
          client_facing_label: string | null
          created_at: string
          description: string | null
          id: string
          trend_age: string
        }
        Insert: {
          aliases?: string[] | null
          canonical_term: string
          category?: string
          client_facing_label?: string | null
          created_at?: string
          description?: string | null
          id?: string
          trend_age?: string
        }
        Update: {
          aliases?: string[] | null
          canonical_term?: string
          category?: string
          client_facing_label?: string | null
          created_at?: string
          description?: string | null
          id?: string
          trend_age?: string
        }
        Relationships: []
      }
      portfolio_tags: {
        Row: {
          created_at: string
          display_order: number
          id: string
          name: string
          slug: string
          style_dictionary_id: string | null
          tag_type: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          name: string
          slug: string
          style_dictionary_id?: string | null
          tag_type?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          name?: string
          slug?: string
          style_dictionary_id?: string | null
          tag_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_tags_style_dictionary_id_fkey"
            columns: ["style_dictionary_id"]
            isOneToOne: false
            referencedRelation: "portfolio_style_dictionary"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          course_id: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          is_verified_purchase: boolean | null
          product_id: string | null
          rating: number | null
          review_text: string | null
          status: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          is_verified_purchase?: boolean | null
          product_id?: string | null
          rating?: number | null
          review_text?: string | null
          status?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          is_verified_purchase?: boolean | null
          product_id?: string | null
          rating?: number | null
          review_text?: string | null
          status?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          category: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          file_url: string | null
          id: string
          images: Json | null
          is_featured: boolean | null
          name: string
          partner_id: string | null
          product_type: string | null
          sku: string | null
          slug: string | null
          status: string | null
          stock_quantity: number | null
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          base_price?: number
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          name: string
          partner_id?: string | null
          product_type?: string | null
          sku?: string | null
          slug?: string | null
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          base_price?: number
          category?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          file_url?: string | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          name?: string
          partner_id?: string | null
          product_type?: string | null
          sku?: string | null
          slug?: string | null
          status?: string | null
          stock_quantity?: number | null
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: string | null
          address_city: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          department: string | null
          email: string | null
          email_verified: boolean | null
          failed_login_attempts: number | null
          first_name: string | null
          full_name: string | null
          id: string
          is_active: boolean
          is_veteran: boolean | null
          language_preference: string | null
          last_login_at: string | null
          last_login_ip: string | null
          last_name: string | null
          last_sign_in_at: string | null
          location: string | null
          locked_until: string | null
          metadata: Json | null
          notification_preferences: Json | null
          phone: string | null
          position: string | null
          profile_photo_url: string | null
          sign_in_count: number | null
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string | null
          subscription_tier: string | null
          updated_at: string
          user_role: Database["public"]["Enums"]["app_role"]
          username: string | null
          veteran_verification_date: string | null
          veteran_verified: boolean | null
        }
        Insert: {
          account_status?: string | null
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string | null
          email?: string | null
          email_verified?: boolean | null
          failed_login_attempts?: number | null
          first_name?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          is_veteran?: boolean | null
          language_preference?: string | null
          last_login_at?: string | null
          last_login_ip?: string | null
          last_name?: string | null
          last_sign_in_at?: string | null
          location?: string | null
          locked_until?: string | null
          metadata?: Json | null
          notification_preferences?: Json | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          sign_in_count?: number | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
          veteran_verification_date?: string | null
          veteran_verified?: boolean | null
        }
        Update: {
          account_status?: string | null
          address_city?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          department?: string | null
          email?: string | null
          email_verified?: boolean | null
          failed_login_attempts?: number | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          is_veteran?: boolean | null
          language_preference?: string | null
          last_login_at?: string | null
          last_login_ip?: string | null
          last_name?: string | null
          last_sign_in_at?: string | null
          location?: string | null
          locked_until?: string | null
          metadata?: Json | null
          notification_preferences?: Json | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          sign_in_count?: number | null
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_role?: Database["public"]["Enums"]["app_role"]
          username?: string | null
          veteran_verification_date?: string | null
          veteran_verified?: boolean | null
        }
        Relationships: []
      }
      purchase_requests: {
        Row: {
          admin_notes: string | null
          completed_at: string | null
          created_at: string
          customer_price: number
          discount_amount: number | null
          email: string
          final_price: number
          full_name: string
          id: string
          is_veteran: boolean | null
          item_name: string
          item_type: string
          message: string | null
          metadata: Json | null
          payment_method: string | null
          payment_status: string
          phone: string | null
          quantity: number | null
          request_number: string
          status: string
          stripe_payment_intent_id: string | null
          suggested_price: number | null
          updated_at: string
          user_id: string | null
          veteran_document_url: string | null
          veteran_id_last4: string | null
          veteran_type: string | null
        }
        Insert: {
          admin_notes?: string | null
          completed_at?: string | null
          created_at?: string
          customer_price: number
          discount_amount?: number | null
          email: string
          final_price: number
          full_name: string
          id?: string
          is_veteran?: boolean | null
          item_name: string
          item_type: string
          message?: string | null
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string
          phone?: string | null
          quantity?: number | null
          request_number?: string
          status?: string
          stripe_payment_intent_id?: string | null
          suggested_price?: number | null
          updated_at?: string
          user_id?: string | null
          veteran_document_url?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Update: {
          admin_notes?: string | null
          completed_at?: string | null
          created_at?: string
          customer_price?: number
          discount_amount?: number | null
          email?: string
          final_price?: number
          full_name?: string
          id?: string
          is_veteran?: boolean | null
          item_name?: string
          item_type?: string
          message?: string | null
          metadata?: Json | null
          payment_method?: string | null
          payment_status?: string
          phone?: string | null
          quantity?: number | null
          request_number?: string
          status?: string
          stripe_payment_intent_id?: string | null
          suggested_price?: number | null
          updated_at?: string
          user_id?: string | null
          veteran_document_url?: string | null
          veteran_id_last4?: string | null
          veteran_type?: string | null
        }
        Relationships: []
      }
      purchases: {
        Row: {
          access_id: string | null
          amount_paid: number | null
          book_id: string
          created_at: string
          id: string
          payment_status: string
          purchase_type: string
          quantity: number
          stripe_session_id: string | null
          user_email: string
        }
        Insert: {
          access_id?: string | null
          amount_paid?: number | null
          book_id: string
          created_at?: string
          id?: string
          payment_status?: string
          purchase_type?: string
          quantity?: number
          stripe_session_id?: string | null
          user_email: string
        }
        Update: {
          access_id?: string | null
          amount_paid?: number | null
          book_id?: string
          created_at?: string
          id?: string
          payment_status?: string
          purchase_type?: string
          quantity?: number
          stripe_session_id?: string | null
          user_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_access_id_fkey"
            columns: ["access_id"]
            isOneToOne: false
            referencedRelation: "access_ids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          service_type: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          service_type?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          service_type?: string | null
          status?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          discount_percent: number | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          user_id: string | null
          uses: number | null
        }
        Insert: {
          code: string
          created_at?: string
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          user_id?: string | null
          uses?: number | null
        }
        Update: {
          code?: string
          created_at?: string
          discount_percent?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          user_id?: string | null
          uses?: number | null
        }
        Relationships: []
      }
      referral_tracking: {
        Row: {
          created_at: string
          id: string
          referral_code_id: string | null
          referred_user_id: string | null
          reward_amount: number | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code_id?: string | null
          referred_user_id?: string | null
          reward_amount?: number | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          referral_code_id?: string | null
          referred_user_id?: string | null
          reward_amount?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_tracking_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      scam_statistics: {
        Row: {
          created_at: string
          id: string
          new_users: number | null
          stat_date: string
          threats_blocked: number | null
          threats_detected: number | null
          total_scans: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          new_users?: number | null
          stat_date: string
          threats_blocked?: number | null
          threats_detected?: number | null
          total_scans?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          new_users?: number | null
          stat_date?: string
          threats_blocked?: number | null
          threats_detected?: number | null
          total_scans?: number | null
        }
        Relationships: []
      }
      scam_submissions: {
        Row: {
          admin_notes: string | null
          ai_analysis: Json | null
          ai_confidence: number | null
          analysis_summary: string | null
          attachments: Json | null
          confidence_score: number | null
          created_at: string
          email: string | null
          id: string
          is_scam: boolean | null
          phone: string | null
          recommendations: string[] | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_level: string | null
          scam_content: string
          sender_info: string | null
          status: string | null
          submission_number: string | null
          submission_type: string
          submitter_email: string | null
          submitter_name: string | null
          submitter_phone: string | null
          suspicious_content: string | null
          threat_level: string | null
          threats_detected: string[] | null
          updated_at: string
          urgency: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          ai_analysis?: Json | null
          ai_confidence?: number | null
          analysis_summary?: string | null
          attachments?: Json | null
          confidence_score?: number | null
          created_at?: string
          email?: string | null
          id?: string
          is_scam?: boolean | null
          phone?: string | null
          recommendations?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_level?: string | null
          scam_content: string
          sender_info?: string | null
          status?: string | null
          submission_number?: string | null
          submission_type: string
          submitter_email?: string | null
          submitter_name?: string | null
          submitter_phone?: string | null
          suspicious_content?: string | null
          threat_level?: string | null
          threats_detected?: string[] | null
          updated_at?: string
          urgency?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          ai_analysis?: Json | null
          ai_confidence?: number | null
          analysis_summary?: string | null
          attachments?: Json | null
          confidence_score?: number | null
          created_at?: string
          email?: string | null
          id?: string
          is_scam?: boolean | null
          phone?: string | null
          recommendations?: string[] | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_level?: string | null
          scam_content?: string
          sender_info?: string | null
          status?: string | null
          submission_number?: string | null
          submission_type?: string
          submitter_email?: string | null
          submitter_name?: string | null
          submitter_phone?: string | null
          suspicious_content?: string | null
          threat_level?: string | null
          threats_detected?: string[] | null
          updated_at?: string
          urgency?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      scheduled_emails: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          max_retries: number | null
          recipient_email: string
          recipient_name: string | null
          retry_count: number | null
          scheduled_for: string
          sent_at: string | null
          status: string | null
          template_data: Json | null
          template_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          max_retries?: number | null
          recipient_email: string
          recipient_name?: string | null
          retry_count?: number | null
          scheduled_for: string
          sent_at?: string | null
          status?: string | null
          template_data?: Json | null
          template_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          max_retries?: number | null
          recipient_email?: string
          recipient_name?: string | null
          retry_count?: number | null
          scheduled_for?: string
          sent_at?: string | null
          status?: string | null
          template_data?: Json | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_emails_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_emails_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      senior_client_profiles: {
        Row: {
          created_at: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          medical_conditions: string | null
          preferred_language: string | null
          relationship: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          medical_conditions?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          medical_conditions?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      site_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: string
          section: string
          sort_order: number | null
          storage_path: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: string
          section: string
          sort_order?: number | null
          storage_path: string
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: string
          section?: string
          sort_order?: number | null
          storage_path?: string
          url?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          group_name: string
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: string | null
        }
        Insert: {
          group_name?: string
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          group_name?: string
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          description: string
          id: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          description: string
          id?: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          description?: string
          id?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      system_heartbeats: {
        Row: {
          created_at: string
          description: string | null
          error_log: string | null
          last_heartbeat: string | null
          service_name: string
          status: string
          threshold_minutes: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          error_log?: string | null
          last_heartbeat?: string | null
          service_name: string
          status?: string
          threshold_minutes?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          error_log?: string | null
          last_heartbeat?: string | null
          service_name?: string
          status?: string
          threshold_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonial_media: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          file_size_bytes: number | null
          file_url: string
          height: number | null
          id: string
          media_type: string
          mime_type: string | null
          processing_status: string | null
          testimonial_id: string | null
          thumbnail_url: string | null
          updated_at: string | null
          width: number | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          file_url: string
          height?: number | null
          id?: string
          media_type: string
          mime_type?: string | null
          processing_status?: string | null
          testimonial_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          file_size_bytes?: number | null
          file_url?: string
          height?: number | null
          id?: string
          media_type?: string
          mime_type?: string | null
          processing_status?: string | null
          testimonial_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonial_media_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonial_media_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials_public"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "testimonial_media_testimonial_id_fkey"
            columns: ["testimonial_id"]
            isOneToOne: false
            referencedRelation: "testimonials_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          display_location: string | null
          display_order: number | null
          email: string
          featured: boolean | null
          has_image: boolean | null
          has_video: boolean | null
          id: string
          location: string
          name: string
          primary_media_url: string | null
          rating: number
          status: Database["public"]["Enums"]["testimonial_status"]
          story: string
          submitted_at: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          display_location?: string | null
          display_order?: number | null
          email: string
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string
          location: string
          name: string
          primary_media_url?: string | null
          rating: number
          status?: Database["public"]["Enums"]["testimonial_status"]
          story: string
          submitted_at?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          display_location?: string | null
          display_order?: number | null
          email?: string
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string
          location?: string
          name?: string
          primary_media_url?: string | null
          rating?: number
          status?: Database["public"]["Enums"]["testimonial_status"]
          story?: string
          submitted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      threat_events: {
        Row: {
          created_at: string
          description: string | null
          device_id: string | null
          id: string
          profile_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string
          target: string | null
          threat_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          device_id?: string | null
          id?: string
          profile_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          status?: string
          target?: string | null
          threat_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          device_id?: string | null
          id?: string
          profile_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string
          target?: string | null
          threat_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "threat_events_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "user_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "threat_events_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_replies: {
        Row: {
          created_at: string
          id: string
          is_staff_reply: boolean | null
          message: string
          ticket_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_staff_reply?: boolean | null
          message: string
          ticket_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_staff_reply?: boolean | null
          message?: string
          ticket_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_replies_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      traffic_sources: {
        Row: {
          campaign: string | null
          content: string | null
          created_at: string | null
          id: string
          medium: string | null
          session_id: string
          source: string | null
          term: string | null
        }
        Insert: {
          campaign?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          medium?: string | null
          session_id: string
          source?: string | null
          term?: string | null
        }
        Update: {
          campaign?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          medium?: string | null
          session_id?: string
          source?: string | null
          term?: string | null
        }
        Relationships: []
      }
      trainer_profiles: {
        Row: {
          available_training_dates: string | null
          certifications: string[] | null
          created_at: string
          id: string
          training_specialization: string | null
          updated_at: string
          user_id: string
          years_training_experience: number | null
        }
        Insert: {
          available_training_dates?: string | null
          certifications?: string[] | null
          created_at?: string
          id?: string
          training_specialization?: string | null
          updated_at?: string
          user_id: string
          years_training_experience?: number | null
        }
        Update: {
          available_training_dates?: string | null
          certifications?: string[] | null
          created_at?: string
          id?: string
          training_specialization?: string | null
          updated_at?: string
          user_id?: string
          years_training_experience?: number | null
        }
        Relationships: []
      }
      update_logs: {
        Row: {
          book_id: string
          changes_summary: string
          chapter_id: string | null
          id: string
          proposed_content: string | null
          status: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          book_id: string
          changes_summary: string
          chapter_id?: string | null
          id?: string
          proposed_content?: string | null
          status?: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          book_id?: string
          changes_summary?: string
          chapter_id?: string | null
          id?: string
          proposed_content?: string | null
          status?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "update_logs_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "update_logs_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "book_content"
            referencedColumns: ["id"]
          },
        ]
      }
      user_2fa_settings: {
        Row: {
          backup_codes: string[] | null
          created_at: string
          encrypted_totp_secret: string | null
          id: string
          is_enabled: boolean
          last_used_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string
          encrypted_totp_secret?: string | null
          id?: string
          is_enabled?: boolean
          last_used_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string
          encrypted_totp_secret?: string | null
          id?: string
          is_enabled?: boolean
          last_used_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_alert_preferences: {
        Row: {
          created_at: string
          email_alerts: boolean | null
          id: string
          phone_number: string | null
          push_alerts: boolean | null
          sms_enabled: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_alerts?: boolean | null
          id?: string
          phone_number?: string | null
          push_alerts?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_alerts?: boolean | null
          id?: string
          phone_number?: string | null
          push_alerts?: boolean | null
          sms_enabled?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_devices: {
        Row: {
          created_at: string
          device_name: string
          device_type: string
          id: string
          ip_address: string | null
          last_scan: string | null
          os_version: string | null
          profile_id: string | null
          protection_level: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_name: string
          device_type: string
          id?: string
          ip_address?: string | null
          last_scan?: string | null
          os_version?: string | null
          profile_id?: string | null
          protection_level?: number
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_name?: string
          device_type?: string
          id?: string
          ip_address?: string | null
          last_scan?: string | null
          os_version?: string | null
          profile_id?: string | null
          protection_level?: number
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_safe"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          bounce: boolean | null
          browser: string | null
          city: string | null
          country: string | null
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          exit_page: string | null
          id: string
          ip_address: string | null
          landing_page: string | null
          os: string | null
          page_views_count: number | null
          referrer: string | null
          session_id: string
          started_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          os?: string | null
          page_views_count?: number | null
          referrer?: string | null
          session_id: string
          started_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          bounce?: boolean | null
          browser?: string | null
          city?: string | null
          country?: string | null
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          exit_page?: string | null
          id?: string
          ip_address?: string | null
          landing_page?: string | null
          os?: string | null
          page_views_count?: number | null
          referrer?: string | null
          session_id?: string
          started_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      verification_codes: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          email: string
          expires_at: string
          id: string
          used: boolean | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          used?: boolean | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          used?: boolean | null
        }
        Relationships: []
      }
      website_inquiries: {
        Row: {
          created_at: string
          email: string
          id: string
          inquiry_type: string
          is_processed: boolean | null
          message: string | null
          metadata: Json | null
          name: string | null
          phone: string | null
          preferred_time: string | null
          processed_at: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          inquiry_type?: string
          is_processed?: boolean | null
          message?: string | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          preferred_time?: string | null
          processed_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          is_processed?: boolean | null
          message?: string | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          preferred_time?: string | null
          processed_at?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      workers: {
        Row: {
          address: string | null
          certifications: string[] | null
          created_at: string
          current_status: Database["public"]["Enums"]["worker_status"] | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          first_name: string
          hire_date: string | null
          hourly_rate: number | null
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          position: string | null
          profile_photo_url: string | null
          skills: string[] | null
          updated_at: string
          worker_id: string | null
        }
        Insert: {
          address?: string | null
          certifications?: string[] | null
          created_at?: string
          current_status?: Database["public"]["Enums"]["worker_status"] | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          skills?: string[] | null
          updated_at?: string
          worker_id?: string | null
        }
        Update: {
          address?: string | null
          certifications?: string[] | null
          created_at?: string
          current_status?: Database["public"]["Enums"]["worker_status"] | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          first_name?: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          position?: string | null
          profile_photo_url?: string | null
          skills?: string[] | null
          updated_at?: string
          worker_id?: string | null
        }
        Relationships: []
      }
      zoom_class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string
          id: string
          user_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zoom_class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "zoom_classes"
            referencedColumns: ["id"]
          },
        ]
      }
      zoom_classes: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number
          id: string
          max_participants: number | null
          scheduled_date: string
          title: string
          zoom_link: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          max_participants?: number | null
          scheduled_date: string
          title: string
          zoom_link: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          max_participants?: number | null
          scheduled_date?: string
          title?: string
          zoom_link?: string
        }
        Relationships: []
      }
    }
    Views: {
      donations_summary: {
        Row: {
          amount: number | null
          created_at: string | null
          donation_type: string | null
          donor_name: string | null
          email: string | null
          id: string | null
          message: string | null
          payment_status: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          donation_type?: string | null
          donor_name?: string | null
          email?: never
          id?: string | null
          message?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          donation_type?: string | null
          donor_name?: string | null
          email?: never
          id?: string | null
          message?: string | null
          payment_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      healthcare_profiles_safe: {
        Row: {
          created_at: string | null
          hospital_affiliation: string | null
          id: string | null
          license_type: string | null
          medical_specialty: string | null
          updated_at: string | null
          user_id: string | null
          years_in_practice: number | null
        }
        Insert: {
          created_at?: string | null
          hospital_affiliation?: string | null
          id?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string | null
          user_id?: string | null
          years_in_practice?: number | null
        }
        Update: {
          created_at?: string | null
          hospital_affiliation?: string | null
          id?: string | null
          license_type?: string | null
          medical_specialty?: string | null
          updated_at?: string | null
          user_id?: string | null
          years_in_practice?: number | null
        }
        Relationships: []
      }
      profiles_limited: {
        Row: {
          account_status: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          position: string | null
          profile_photo_url: string | null
          username: string | null
        }
        Insert: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          username?: string | null
        }
        Update: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          username?: string | null
        }
        Relationships: []
      }
      profiles_safe: {
        Row: {
          account_status: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          position: string | null
          profile_photo_url: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          account_status?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          position?: string | null
          profile_photo_url?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      senior_profiles_safe: {
        Row: {
          created_at: string | null
          id: string | null
          preferred_language: string | null
          relationship: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          preferred_language?: string | null
          relationship?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      testimonials_public: {
        Row: {
          created_at: string | null
          display_location: string | null
          display_order: number | null
          featured: boolean | null
          has_image: boolean | null
          has_video: boolean | null
          id: string | null
          location: string | null
          name: string | null
          primary_media_url: string | null
          rating: number | null
          status: Database["public"]["Enums"]["testimonial_status"] | null
          story: string | null
        }
        Insert: {
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
        }
        Update: {
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
        }
        Relationships: []
      }
      testimonials_staff: {
        Row: {
          approved_at: string | null
          created_at: string | null
          display_location: string | null
          display_order: number | null
          featured: boolean | null
          has_image: boolean | null
          has_video: boolean | null
          id: string | null
          location: string | null
          name: string | null
          primary_media_url: string | null
          rating: number | null
          status: Database["public"]["Enums"]["testimonial_status"] | null
          story: string | null
          submitted_at: string | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          created_at?: string | null
          display_location?: string | null
          display_order?: number | null
          featured?: boolean | null
          has_image?: boolean | null
          has_video?: boolean | null
          id?: string | null
          location?: string | null
          name?: string | null
          primary_media_url?: string | null
          rating?: number | null
          status?: Database["public"]["Enums"]["testimonial_status"] | null
          story?: string | null
          submitted_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_booking_requests: {
        Row: {
          base_price: number | null
          created_at: string | null
          discount_amount: number | null
          final_price: number | null
          id: string | null
          preferred_dates: string | null
          request_number: string | null
          service_name: string | null
          service_tier: string | null
          service_type: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string | null
          discount_amount?: number | null
          final_price?: number | null
          id?: string | null
          preferred_dates?: string | null
          request_number?: string | null
          service_name?: string | null
          service_tier?: string | null
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string | null
          discount_amount?: number | null
          final_price?: number | null
          id?: string | null
          preferred_dates?: string | null
          request_number?: string | null
          service_name?: string | null
          service_tier?: string | null
          service_type?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      assign_role_by_email: {
        Args: {
          target_email: string
          target_role: Database["public"]["Enums"]["app_role"]
        }
        Returns: undefined
      }
      assign_user_role: {
        Args: {
          assigned_by_user_id?: string
          target_role: Database["public"]["Enums"]["app_role"]
          target_user_id: string
        }
        Returns: undefined
      }
      generate_request_number: { Args: never; Returns: string }
      get_profile_sensitive_data: {
        Args: { target_user_id: string }
        Returns: Json
      }
      get_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: { role: Database["public"]["Enums"]["app_role"]; user_id: string }
        Returns: boolean
      }
      user_has_any_role: {
        Args: { check_roles: Database["public"]["Enums"]["app_role"][] }
        Returns: boolean
      }
      user_has_role: {
        Args: { check_role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "customer"
        | "admin"
        | "staff"
        | "analyst"
        | "trainer"
        | "secretary"
        | "training_coordinator"
        | "business_consultant"
        | "support_specialist"
      contact_status: "lead" | "prospect" | "customer" | "inactive"
      notification_type:
        | "job_assignment"
        | "schedule_change"
        | "new_message"
        | "system_alert"
        | "payment_received"
      order_status:
        | "pending"
        | "confirmed"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      partner_payment_status: "pending" | "processing" | "completed" | "failed"
      partner_status: "pending" | "active" | "suspended" | "inactive"
      partner_type: "vendor" | "affiliate" | "distributor"
      testimonial_status: "pending" | "approved" | "rejected"
      worker_status: "available" | "busy" | "off_duty" | "on_break"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "customer",
        "admin",
        "staff",
        "analyst",
        "trainer",
        "secretary",
        "training_coordinator",
        "business_consultant",
        "support_specialist",
      ],
      contact_status: ["lead", "prospect", "customer", "inactive"],
      notification_type: [
        "job_assignment",
        "schedule_change",
        "new_message",
        "system_alert",
        "payment_received",
      ],
      order_status: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      partner_payment_status: ["pending", "processing", "completed", "failed"],
      partner_status: ["pending", "active", "suspended", "inactive"],
      partner_type: ["vendor", "affiliate", "distributor"],
      testimonial_status: ["pending", "approved", "rejected"],
      worker_status: ["available", "busy", "off_duty", "on_break"],
    },
  },
} as const
